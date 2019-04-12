<template>
  <div>
    <div class="card border-dark">
      <h5 class="card-header border-dark">
        Phyloreferences
      </h5>
      <div class="card-body p-0">
        <table class="table table-hover table-flush">
          <thead>
            <th width="15%">Name</th>
            <th width="40%">Description</th>
            <th>Resolved Open Tree node</th>
            <th>Specifiers</th>
            <th>Open Tree Taxonomy ID</th>
          </thead>
          <tbody>
            <tr
              v-if="loadedPhylorefs.length === 0"
              class="bg-white"
            >
              <td colspan="4">
                <center><em>No phyloreferences loaded</em></center>
              </td>
            </tr>
            <template v-for="(phyloref, phylorefIndex) of loadedPhylorefs">
              <tr :key="phylorefIndex"><!-- This :key only works as long as users can't reorder the phylorefs -->
                <td :rowspan="getSpecifiersForPhyloref(phyloref).length + 1">
                  {{ phyloref.label || `Phyloref ${phylorefIndex + 1}` }}
                </td>
                <td :rowspan="getSpecifiersForPhyloref(phyloref).length + 1">
                  <span v-html="getPhylorefDescription(phyloref)"></span>
                </td>
                <td :rowspan="getSpecifiersForPhyloref(phyloref).length + 1">
                  &nbsp;
                  <template v-for="(nodeId, nodeIdIndex) of reasoningResults[phyloref['@id']]">
                    <a target="_blank" :href="'https://tree.opentreeoflife.org/opentree/@' + getOTTNodeId(currentNodes[nodeId])[1]">{{getOTTNodeId(currentNodes[nodeId])[1]}}</a><br />
                  </template>
                </td>
              </tr>
              <template v-for="specifier of getSpecifiersForPhyloref(phyloref)">
                <tr :key="'phyloref' + phylorefIndex + ', specifier: ' + getLabelForSpecifier(specifier)">
                  <td>{{getSpecifierType(phyloref, specifier)}} <span v-html="getLabelForSpecifierAsHTML(specifier)"></span></td>
                  <td>
                    <template v-if="getOpenTreeTaxonomyID(specifier)">
                      <a target="_blank" :href="'https://tree.opentreeoflife.org/opentree/@ott' + getOpenTreeTaxonomyID(specifier)">{{getOpenTreeTaxonomyID(specifier)}}</a>
                      (<a target="_blank" :href="'https://tree.opentreeoflife.org/taxonomy/browse?id=' + getOpenTreeTaxonomyID(specifier)">ott</a>)
                    </template>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <div class="btn-group" role="group" area-label="Add phyloreferences">
          <button
            class="btn btn-primary"
            href="javascript: void(0)"
            onclick="$('#load-jsonld').trigger('click')"
          >
            Add phyloreferences from JSON-LD file
          </button>
          <input
            id="load-jsonld"
            type="file"
            multiple="true"
            class="d-none"
            @change="loadJSONLDFromFileInputById('#load-jsonld')"
          >
          <button class="btn btn-secondary dropdown-toggle" type="button" id="addFromExamples" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Add phyloreferences from example
          </button>
          <div class="dropdown-menu" aria-labelledby="addFromExamples">
            <a href="javascript:;" class="dropdown-item" v-for="example of exampleJSONLDURLs" v-bind:key="example.url" @click="loadJSONLDFromURL(example.url)">
              {{example.title}}
            </a>
          </div>
        </div>
        <div class="btn-group ml-2" role="group" area-label="Edit phyloreference list">
          <button class="btn btn-danger" type="button" @click="loadedPhylorefs = []">
            Clear phylorefs
          </button>
        </div>
        <div class="btn-group ml-2" role="group" area-label="Open Tree Taxonomy tasks">
          <button class="btn btn-primary" type="button" @click="queryOpenTreeTaxonomyIDs()">
            Query specifiers against Open Tree of Life Taxonomy
          </button>
        </div>
      </div>
    </div>

    <div class="card border-dark mt-2">
      <h5 class="card-header border-dark">
        Phylogeny as Newick
      </h5>
      <div class="card-body">
        <form>
          <div class="form-group row">
            <label
              for="newick"
              class="col-md-2 control-label"
            >
              Newick
            </label>
            <div class="col-md-10 input-group">
              <textarea
                v-model.lazy="newick"
                rows="3"
                class="form-control"
                placeholder="Enter Newick string for phylogeny here"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer">
        <div class="btn-group" role="group" area-label="Look up trees on the Open Tree of Life">
          <button
            class="btn btn-primary"
            href="javascript: void(0)"
            @click="downloadInducedSubtreeFromOpenTreeOfLife(ottIdsForAllSpecifiers)"
          >
            Download induced subtree from the Open Tree of Life
          </button>
        </div>
      </div>
    </div>

    <!-- Display the phylogeny (unless there were Newick parsing errors) -->
    <div
      class="card border-dark mt-2"
    >
      <h5 class="card-header">
        Phylogeny visualization
      </h5>
      <div class="card-body">
        <Phylotree
          :newick="newick"
        />
      </div>
      <div class="card-footer">
        <div class="btn-group" role="group" area-label="Reason over this phylogeny">
          <button
            class="btn btn-primary"
            href="javascript: void(0)"
            @click="reasonOverPhylogeny()"
          >
            Reason over this phylogeny<span v-if="reasoningInProgress"> (in progress)</span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
/*
 * A modal for displaying information about loaded phyloreferences,
 * and the ability to add new phyloreferences.
 */

import { has, isEqual, uniq, chunk, isString } from 'lodash';
import Vue from 'vue';
import jQuery from 'jquery';
import { PhylorefWrapper, PhylogenyWrapper, ScientificNameWrapper } from '@phyloref/phyx';

import Phylotree from './phylogeny/Phylotree.vue';

export default {
  name: 'PhylorefTable',
  components: {
    Phylotree,
  },
  data: function () {
    return {
      flagDisplayExpression: false,
      loadedPhylorefs: [],
      openTreeTaxonomyInfoByName: {},
      newick: '()',
      PHYX_CONTEXT_JSON: "http://www.phyloref.org/phyx.js/context/v0.1.0/phyx.json",
      ONTOLOGY_BASEURI: "http://example.org/#",
      reasoningInProgress: false,
      reasoningResults: {},
      currentNodes: {}
    };
  },
  computed: {
    allSpecifiers() {
      return this.loadedPhylorefs.map(phyloref => this.getSpecifiersForPhyloref(phyloref)).reduce((acc, val) => acc.concat(val), []);
    },
    phylorefsWithMoreThanOneSpecifier() {
      return this.loadedPhylorefs.filter(phyloref => (this.getSpecifiersForPhyloref(phyloref) || []).length > 1);
    },
    ottIdsForAllSpecifiers() {
      // Assumes that queryOpenTreeTaxonomyIDs has already been called!
      const ottIds = this.allSpecifiers.map(specifier => this.getOpenTreeTaxonomyID(specifier))
        .filter(x => x !== undefined && x !== null);
      return ottIds;
    },
    asOntology() {
      const phylorefsWithEquivalentClass = this.loadedPhylorefs.filter(
        phyloref => has(phyloref, 'equivalentClass')
      );
      // Add the phylogeny.
      const phylogenyNodes = new PhylogenyWrapper({
        newick: this.newick,
      }).getNodesAsJSONLD(this.ONTOLOGY_BASEURI + 'phylogeny');
      const phylorefsByLabel = {};
      phylorefsWithEquivalentClass.forEach(phyloref => {
        if(has(phyloref, 'label')) {
          if(!has(phyloref, '@id')) {
            // TODO: make up an '@id'.
          }
          phylorefsByLabel[phyloref.label] = phyloref;
        }
      });
      // Modify nodes to support Model 2.0 taxonomic units.
      this.currentNodes = {};
      phylogenyNodes.forEach(nodeAsParam => {
        const node = nodeAsParam;
        // Set a context.
        node['@context'] = this.PHYX_CONTEXT_JSON;
        // Make sure this node has a '@type'.
        if (!has(node, '@type')) node['@type'] = [];
        if (!Array.isArray(node['@type'])) node['@type'] = [node['@type']];
        // We replace "parent" with "obo:CDAO_0000179" so we get has_Parent
        // relationships in our output ontology.
        // To be fixed in https://github.com/phyloref/phyx.js/issues/10
        if (has(node, 'parent')) node['obo:CDAO_0000179'] = { '@id': node.parent };
        // For every internal node in this phylogeny, check to see if it's expected to
        // resolve to a phylogeny we know about. If so, add an rdf:type to that effect.
        let expectedToResolveTo = node.labels || [];
        // Are there any phyloreferences expected to resolve here?
        if (has(node, 'expectedPhyloreferenceNamed')) {
          expectedToResolveTo = expectedToResolveTo.concat(node.expectedPhyloreferenceNamed);
        }
        expectedToResolveTo.forEach((phylorefLabel) => {
          if (!has(phylorefsByLabel, phylorefLabel)) return;
          // This node is expected to match phylorefLabel, which is a phyloreference we know about.
          const phylorefId = phylorefsByLabel[phylorefLabel]['@id'];
          node['@type'].push({
            '@type': 'owl:Restriction',
            onProperty: 'obo:OBI_0000312', // obi:is_specified_output_of
            someValuesFrom: {
              '@type': 'owl:Class',
              intersectionOf: [
                { '@id': 'obo:OBI_0302910' }, // obi:prediction
                {
                  '@type': 'owl:Restriction',
                  onProperty: 'obo:OBI_0000293', // obi:has_specified_input
                  someValuesFrom: { '@id': phylorefId },
                },
              ],
            },
          });
        });
        // Does this node have taxonomic units? If so, convert them into class expressions.
        if (has(node, 'representsTaxonomicUnits')) {
          node.representsTaxonomicUnits.forEach((tunit) => {
            this.convertTUtoRestriction(tunit).forEach((restriction) => {
              node['@type'].push({
                '@type': 'owl:Restriction',
                onProperty: 'obo:CDAO_0000187',
                someValuesFrom: restriction,
              });
            });
          });
        }
        // Now, rdfpipe can handle '@type's that contain restrictions,
        // but OWLAPI can't. So let's translate all '@type's into
        // 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'.
        node['http://www.w3.org/1999/02/22-rdf-syntax-ns#type'] = node['@type']
          .map(c => isString(c) ? { '@id': c } : c);
        delete node['@type'];
        // Store for later lookups.
        this.currentNodes[node['@id']] = node;
      });
      // Finally, add a header for this ontology.
      let ontologyHeader = [
        {
          '@context': this.PHYX_CONTEXT_JSON,
          '@id': this.ONTOLOGY_BASEURI,
          '@type': 'owl:Ontology',
          'owl:imports': [
            'http://raw.githubusercontent.com/phyloref/curation-workflow/develop/ontologies/phyloref_testcase.owl',
            'http://ontology.phyloref.org/2018-12-14/phyloref.owl',
            'http://ontology.phyloref.org/2018-12-14/tcan.owl',
          ],
        },
      ];
      return JSON.stringify(ontologyHeader.concat(phylorefsWithEquivalentClass).concat(phylogenyNodes), null, 4);
    },
    exampleJSONLDURLs() { return [
      // Returns a list of example files to display in the "Examples" menu.
      {
        url: 'examples/fisher_et_al_2007.jsonld',
        title: 'Fisher et al, 2007',
      },
      {
        url: 'examples/hillis_and_wilcox_2005.jsonld',
        title: 'Hillis and Wilcox, 2005',
      },
      {
        url: 'examples/brochu_2003.jsonld',
        title: 'Brochu 2003',
      },
    ]}
  },
  methods: {
    convertTUtoRestriction(tunit) {
      // If we're called with a specifier, use the first TU in that specifier (for now).
      if (has(tunit, 'referencesTaxonomicUnits')) {
        return this.convertTUtoRestriction(tunit.referencesTaxonomicUnits[0] || {});
      }
      // Build up a series of taxonomic units from scientific names and specimens.
      const results = [];
      if (has(tunit, 'scientificNames')) {
        tunit.scientificNames.forEach((sciname) => {
          const wrappedSciname = new ScientificNameWrapper(sciname);
          results.push({
            '@type': 'owl:Restriction',
            onProperty: 'http://rs.tdwg.org/ontology/voc/TaxonConcept#hasName',
            someValuesFrom: {
              '@type': 'owl:Class',
              intersectionOf: [
                {
                  // TODO: replace with a check once we close https://github.com/phyloref/phyx.js/issues/5.
                  // For now, we pretend that all names are ICZN names.
                  '@id': 'obo:NOMEN_0000107',
                },
                {
                  '@type': 'owl:Restriction',
                  onProperty: 'dwc:scientificName',
                  // TODO: We really want the "canonical name" here: binomial or
                  // trinomial, but without any additional authority information.
                  // See https://github.com/phyloref/phyx.js/issues/8
                  hasValue: wrappedSciname.binomialName,
                },
              ],
            },
          });
        });
      } else if (has(tunit, 'includesSpecimens')) {
        // This is a quick-and-dirty implementation. Discussion about it should be
        // carried out in https://github.com/phyloref/clade-ontology/issues/61
        tunit.includesSpecimens.forEach((specimen) => {
          const wrappedSpecimen = new SpecimenWrapper(specimen);
          results.push({
            '@type': 'owl:Restriction',
            onProperty: 'dwc:organismID',
            hasValue: wrappedSpecimen.occurrenceID,
          });
        });
      } else {
        // Ignore it for now (but warn the user).
        console.log(`WARNING: taxonomic unit could not be converted into restriction: ${JSON.stringify(tunit)}\n`);
        results.push({});
      }
      return results;
    },

    reasonOverPhylogeny() {
      // Send JSON-LD to server for reasoning.
      // Reason over all the phyloreferences and store the results on
      // the Vue model at vm.reasoningResults so we can access them.
      // Are we already reasoning? If so, ignore.
      if (this.reasoningInProgress) return;
      // Disable "Reason" buttons so they can't be reused.
      this.reasoningInProgress = true;
      this.reasoningResults = {};
      
      jQuery.post('http://localhost:34214/reason', {
        // This will convert the JSON-LD file into an application/x-www-form-urlencoded
        // string (see https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings under
        // processData for details). The POST data sent to the server will look like:
        //  jsonld=%7B%5B%7B%22title%22%3A...
        // which translates to:
        //  jsonld={[{"title":...
        jsonld: this.asOntology,
      }).done((data) => {
        this.reasoningResults = data.phylorefs;
        // console.log('Data retrieved: ', data);
      }).fail((jqXHR, textStatus, errorThrown) => {
        // We can try using the third argument, but it appears to be the
        // HTTP status (e.g. 'Internal Server Error'). So we default to that,
        // but look for a better one in the JSON response from the server, if
        // available.
        let error = errorThrown;
        if (has(jqXHR, 'responseJSON') && has(jqXHR.responseJSON, 'error')) {
          error = jqXHR.responseJSON.error;
        }
        if (error === undefined || error === '') error = 'unknown error';
        alert(`Error occurred on server while reasoning: ${error}`);
      }).always(() => {
        // Reset "Reasoning" buttons to their usual state.
        this.reasoningInProgress = false;
      });
    },

    getOTTNodeId(node) {
      const labels = node.labels || [];
      if(labels.length == 0) return undefined;
      const label = labels[0]; // Ignore other labels.
      const match = /^(.*)[_\s](.*?ott.*)$/.exec(label);
      if(match == null) {
          const matchMRCA = /^mrca.*$/.exec(label);
          if(matchMRCA == null) return undefined;
          return ["", label];
      }
      return [match[1], match[2]];
    },

    downloadInducedSubtreeFromOpenTreeOfLife(ottIds) {
      if(ottIds.length === 0) return;

      // Induced subtree approach
      jQuery.ajax({
        type: 'POST',
        url: 'https://ot39.opentreeoflife.org/v3/tree_of_life/induced_subtree',
        data: JSON.stringify({
          ott_ids: ottIds,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: (data) => {
          this.newick = data.newick;
        },
      })
        .fail(x => {
          if(x.responseJSON.message === "[/v3/tree_of_life/induced_subtree] Error: Nodes not found!") {
            const unknownOttIds = x.responseJSON.unknown;
            console.log("The Open Tree synthetic tree does not contain the following nodes: ", unknownOttIds);
            const knownOttIds = ottIds.filter(id => !has(unknownOttIds, "ott" + id));
            console.log("Query has been reduced to the following nodes: ", knownOttIds);
            // Redo query without unknown OTT Ids.
            jQuery.ajax({
              type: 'POST',
              url: 'https://ot39.opentreeoflife.org/v3/tree_of_life/induced_subtree',
              data: JSON.stringify({
                ott_ids: knownOttIds,
              }),
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              success: (data) => {
                this.newick = data.newick;
              },
            }).fail(x => console.log("Error accessing Open Tree induced_subtree", x));
          } else {
            console.log("Error accessing Open Tree induced_subtree", x);
          }
        });
    },

    getPhylorefDescription(phyloref) {
      const description = phyloref.cladeDefinition || phyloref['obo:IAO_0000115'] || 'None';

      // If there are '\n's in the text, replace them with <br>.
      return description.replace(/\n+/g, "<br />");
    },

    getOpenTreeTaxonomyID(specifier) {
      const matches = this.openTreeTaxonomyInfoByName[this.getScinameForSpecifier(specifier)];
      if(matches && matches.length > 0) {
        return matches[0]['taxon']['ott_id'];
      }
    },

    queryOpenTreeTaxonomyIDs() {
      // Calculate names from currently loaded specifiers.
      const names = this.allSpecifiers.map(specifier => this.getScinameForSpecifier(specifier));
      this.queryOpenTreeTaxonomyIDsForNames({names});
    },

    setOpenTreeTaxonomyInfoByNames(results) {
      results.forEach(info => {
        if(has(info, 'name') && info.name && has(info, 'matches') && info.matches && info.matches.length > 0) {
          const name = info.name.trim();
          // console.log("Setting", name, "to", info['matches']);
          // Do we have any flags? If so, ignore this.
          const flags = info.matches[0].taxon.flags || [];
          // TODO do something cleverer when choosing between multiple matches
          Vue.set(this.openTreeTaxonomyInfoByName, name, info['matches'] || []);
        }
      });
    },

    queryOpenTreeTaxonomyIDsForNames(options) {
      // Creates queries to the Open Tree Taxonomy for the provided names.
      // This will return asynchonously; you need to call getOpenTreeTaxonomyID(name)
      // to retrieve the results.
      // Options can be anything from https://github.com/OpenTreeOfLife/germinator/wiki/TNRS-API-v3#match_names, including:
      //  - context_name:
      //  - do_approximate_matching
      // Deduplicate names to be queried.
      const names = uniq(options.names)
        .filter(name => name !== undefined && name !== null) // Eliminate any undefineds or nulls.
        .sort();
      // Step 1. Delete existing entries for the provided names.
      this.setOpenTreeTaxonomyInfoByNames(names.map(name => {
        return {
          name,
          matches: [],
        };
      }));
      // OToL TNRS match_names has a limit of 1,000 names.
      chunk(names, 999).forEach(chunk => {
        options.names = chunk;
        const data = JSON.stringify(options);
        // Step 2. Spawn queries to OTT asking for the names.
        jQuery.ajax({
          type: 'POST',
          url: 'https://api.opentreeoflife.org/v3/tnrs/match_names',
          data,
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success: (data) => {
            this.setOpenTreeTaxonomyInfoByNames(data.results);
          },
        })
          .fail(x => console.log("Error accessing Open Tree Taxonomy", x));
      });
    },

    getSpecifierType(phyloref, specifier) {
      if((phyloref.internalSpecifiers || []).indexOf(specifier) !== -1) return "includes";
      if((phyloref.externalSpecifiers || []).indexOf(specifier) !== -1) return "excludes";
      return "unknown";
    },

    getSpecifiersForPhyloref(phyloref) {
      const specifiers = phyloref.internalSpecifiers || [];
      return specifiers.concat(phyloref.externalSpecifiers || []);
    },

    getLabelForSpecifier(specifier) {
      return PhylorefWrapper.getSpecifierLabel(specifier);
    },

    getLabelForSpecifierAsHTML(specifier) {
      const label = PhylorefWrapper.getSpecifierLabel(specifier);
      if(label.startsWith("Specimen")) return label;

      return label.replace(/^\w+ [a-z\-]+/, "<em>$&</em>");
    },

    getScinameForSpecifier(specifier) {
      const label = PhylorefWrapper.getSpecifierLabel(specifier);
      if(label.startsWith("Specimen")) return undefined;
      const matches = label.match(/^\w+ [a-z\-]+/);
      if(matches) return matches[0];
      return undefined;
    },

    loadJSONLDFromURL(url) {
      // Change the current PHYX to that in the provided URL.
      // Will ask the user to confirm before replacing it.

      jQuery.getJSON(url)
        .done((data) => {
          this.extractPhyloreferencesFromJSONLD(data);
        })
        .fail((error) => {
          if (error.status === 200) {
            alert(`Could not load JSON-LD file '${url}': file malformed, see console for details.`);
          } else {
            alert(`Could not load JSON-LD file '${url}': server error ${error.status} ${error.statusText} from ${JSON.stringify(error)}`);
          }
        });
    },

    loadJSONLDFromFileInputById(fileInputId) {
      //
      // Load a JSON file from the local file system using FileReader. fileInput
      // needs to be an HTML element representing an <input type="file"> in which
      // the user has selected the local file they wish to load.
      //
      // This code is based on https://stackoverflow.com/a/21446426/27310

      if (typeof window.FileReader !== 'function') {
        alert('The FileReader API is not supported on this browser.');
        return;
      }

      const $fileInput = jQuery(fileInputId);
      if (!$fileInput) {
        alert('Programmer error: No file input element specified.');
        return;
      }

      if (!$fileInput.prop('files')) {
        alert('File input element found, but files property missing: try another browser?');
        return;
      }

      const files = $fileInput.prop('files');
      if (files.length === 0) {
        alert('Please select a file before attempting to load it.');
        return;
      }

      for(let x = 0; x < files.length; x++) {
        const file = files.item(x);
        const fr = new FileReader();
        fr.onload = ((e) => {
          const lines = e.target.result;
          const jsonld = JSON.parse(lines);

          this.extractPhyloreferencesFromJSONLD(jsonld);
        });
        fr.readAsText(file);
      }
    },

    addPhyloref(phyloref) {
      // Check to make sure this phyloref hasn't already been added.
      if(this.loadedPhylorefs.find(phy => isEqual(phy, phyloref)) !== undefined) return;

      // No previous match? Then add it in!
      this.loadedPhylorefs.push(phyloref);
    },

    extractPhyloreferencesFromJSONLD(jsonld) {
      // Extract phyloreferences from the provided JSONLD file and add them to
      // state.loaded. We use isEqual to prevent adding the same phyloreference
      // more than once, but we will add different phyloreferences with the
      // same '@id'.

      // JSON-LD files sometimes contain an array of elements. In this case,
      // we should try adding every one.
      if(Array.isArray(jsonld)) {
        jsonld.forEach(element => this.extractPhyloreferencesFromJSONLD(element));
      }

      // If this was generated by the Authoring Tool, then we can find phyloreferences
      // just by looking for jsonld.phylorefs.
      if(has(jsonld, 'phylorefs') && Array.isArray(jsonld.phylorefs)) {
        jsonld.phylorefs.forEach(phy => this.addPhyloref(phy));
      }

      // If it was created by phyx2ontology, the phyloreferences can be recognized
      // has having a subClassOf 'phyloref:Phyloreference'. Let's look for that.
      if(has(jsonld, 'subClassOf')) {
        if(Array.isArray(jsonld.subClassOf) && jsonld.subClassOf.includes('phyloref:Phyloreference'))
          this.addPhyloref(jsonld);
        if(jsonld.subClassOf === 'phyloref:Phyloreference')
          this.addPhyloref(jsonld);
      }
    },
  }
};
</script>
