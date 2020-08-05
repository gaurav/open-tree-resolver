(function(e){function t(t){for(var r,a,i=t[0],l=t[1],c=t[2],d=0,u=[];d<i.length;d++)a=i[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&u.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);f&&f(t);while(u.length)u.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,i=1;i<n.length;i++){var l=n[i];0!==o[l]&&(r=!1)}r&&(s.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},s=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/open-tree-resolver/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var f=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"0417":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("2ef0"),o=n("9068"),s=l(n("2b0e")),a=l(n("1157")),i=n("252c");function l(e){return e&&e.__esModule?e:{default:e}}s.default.component("ResizeObserver",i.ResizeObserver);var c={name:"Phylotree",props:{newick:{type:String,default:"()"},spacingX:{type:Number,default:20},phylogenyIndex:{type:String,default:(0,r.uniqueId)()},baseURIForPhylogeny:{type:String},displayInternalNodes:{type:Boolean,default:!1}},computed:{baseURIForPhylogenyComputed:function(){return this.baseURIForPhylogeny||"http://example.org/#phylogeny".concat(this.phylogenyIndex)},parsedNewick:function(){return(0,r.has)(window,"d3")&&(0,r.has)(window.d3,"layout")&&(0,r.has)(window.d3.layout,"newick_parser")?new o.PhylogenyWrapper({newick:this.newick}).getParsedNewickWithIRIs(this.baseURIForPhylogenyComputed,window.d3.layout.newick_parser):new o.PhylogenyWrapper({newick:this.newick}).getParsedNewickWithIRIs(this.baseURIForPhylogenyComputed)},newickErrors:function(){var e=o.PhylogenyWrapper.getErrorsInNewickString(this.newick);return e.filter((function(e){return"No phylogeny entered"!==e.title}))},tree:function(){var e=this;if((0,r.has)(window,"d3")&&(0,r.has)(window.d3,"layout")&&(0,r.has)(window.d3.layout,"phylotree")){var t=window.d3.layout.phylotree().svg(window.d3.select("#phylogeny_".concat(this.phylogenyIndex))).options({"internal-names":!0,transitions:!1,"left-right-spacing":"fit-to-size","top-bottom-spacing":"fixed-step"}).style_nodes((function(t,n){var s=t.selectAll("text");if(e.displayInternalNodes&&(0,r.has)(n,"name")&&""!==n.name&&n.children&&s.empty()&&(s=t.append("text"),s.classed("internal-label",!0).text(n.name).attr("dx",".3em").attr("dy",".3em")),void 0!==n.name&&void 0===n.children){var a=o.TaxonomicUnitWrapper.fromLabel(n.name);a||t.classed("terminal-node-without-tunits",!0)}}));return t(this.parsedNewick),t}}},methods:{redrawTree:function(){var e=this.tree;e&&this.tree.size([0,(0,a.default)("#phylogeny_".concat(this.phylogenyIndex)).width()]).spacing_x(this.spacingX).update()}},mounted:function(){this.redrawTree()},watch:{newick:function(){this.redrawTree()}}};t.default=c},"054c":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal",attrs:{id:"about-open-tree-resolver",tabindex:"-1",role:"dialog"}},[n("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[n("div",{staticClass:"modal-content"},[n("div",{staticClass:"modal-header"},[n("h5",{staticClass:"modal-title"},[e._v("\n          About this tool\n        ")]),n("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[n("span",{attrs:{"aria-hidden":"true"}},[e._v("\n            ×\n          ")])])]),n("div",{staticClass:"modal-body col-md-12"},[n("p",[e._v("\n          The Phyloreference Open Tree Resolver was built as part of the\n          "),n("a",{attrs:{href:"https://www.phyloref.org"}},[e._v("\n            Phyloreferencing project\n          ")]),e._v(",\n          funded by the US National Science Foundation through collaborative\n          grants "),n("a",{attrs:{href:"http://www.nsf.gov/awardsearch/showAward?AWD_ID=1458484"}},[e._v("\n            DBI-1458484\n          ")]),e._v("\n          and "),n("a",{attrs:{href:"http://www.nsf.gov/awardsearch/showAward?AWD_ID=1458604"}},[e._v("\n            DBI-1458604\n          ")]),e._v(".\n          See "),n("a",{attrs:{href:"http://www.phyloref.org/about/#funding"}},[e._v("\n            Funding\n          ")]),e._v(" for details.\n        ")]),n("p",[e._v("The Curation Tool uses a number of open-source libraries, including:")]),n("ul",[n("li",[n("a",{attrs:{href:"https://cli.vuejs.org/"}},[e._v("\n              Vue CLI 3\n            ")])]),n("li",[n("a",{attrs:{href:"https://getbootstrap.com/"}},[e._v("\n              Bootstrap\n            ")])]),n("li",[n("a",{attrs:{href:"https://jquery.com/"}},[e._v("\n              jQuery\n            ")])]),n("li",[n("a",{attrs:{href:"https://github.com/veg/phylotree.js"}},[e._v("\n              phylotree.js\n            ")]),e._v(",\n            published as "),n("a",{attrs:{href:"https://doi.org/10.1186/s12859-018-2283-2"}},[e._v("\n              Shank "),n("em",[e._v("et al")]),e._v(", 2018\n            ")])]),n("li",[n("a",{attrs:{href:"https://d3js.org/"}},[e._v("\n              D3.js\n            ")])]),n("li",[n("a",{attrs:{href:"https://momentjs.com/"}},[e._v("\n              Moment.js\n            ")])]),n("li",[n("a",{attrs:{href:"https://github.com/eligrey/FileSaver.js"}},[e._v("\n              FileSaver.js\n            ")])])])]),n("div",{staticClass:"modal-footer"},[n("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[e._v("\n          Close\n        ")])])])])])}];n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}))},"0fed":function(e,t,n){},1:function(e,t){},"199c":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("2ef0"),o=h(n("1157")),s=n("9068"),a=h(n("2b0e")),i=n("0041"),l=n("b2c6"),c=h(n("470b")),f=h(n("f7af")),d=h(n("9b34")),u=h(n("c0e6")),p=h(n("f845"));function h(e){return e&&e.__esModule?e:{default:e}}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g={name:"App",components:{TopNavigationBar:f.default,PhylorefTable:d.default,AboutOpenTreeResolverModal:p.default,Phylotree:u.default},data:function(){return{version:Object({NODE_ENV:"production",BASE_URL:"/open-tree-resolver/"}).VUE_APP_VERSION,phylorefs:[],newick:"()",ottInfoByName:{},nodesByID:{},reasoningResults:{},reasoningInProgress:!1,unknownOttIds:[],unknownOttIdReasons:{},selectedPhyloref:void 0,speciesByNodeId:{},gbifBySpeciesName:{},PHYX_CONTEXT_JSON:"http://www.phyloref.org/phyx.js/context/v0.2.0/phyx.json",ONTOLOGY_BASEURI:"http://example.org/phyloref_open_tree_resolver#",OWL_IMPORTS:["http://raw.githubusercontent.com/phyloref/curation-workflow/develop/ontologies/phyloref_testcase.owl","http://ontology.phyloref.org/2018-12-14/phyloref.owl","http://ontology.phyloref.org/2018-12-14/tcan.owl"],CDAO_REPRESENTS_TU:"obo:CDAO_0000187",OWL_RESTRICTION:"owl:Restriction",OWL_ONTOLOGY:"owl:Ontology"}},computed:{allSpecifiers:function(){var e=this;return this.phylorefs.map((function(t){return e.getSpecifiersForPhyloref(t)})).reduce((function(e,t){return e.concat(t)}),[])},ottIdsForAllSpecifiers:function(){var e=this,t=this.allSpecifiers.map((function(t){return e.getOTTId(t)})).filter((function(e){return void 0!==e&&null!==e}));return t},ottInfoBySpecifierLabel:function(){var e=this,t={};return this.allSpecifiers.forEach((function(n){var r=new s.TaxonomicUnitWrapper(n).label;if(r){var o=e.getScinameForSpecifier(n);if(o){var a=e.ottInfoByName[o];a&&(t[r]=a)}}})),t},exampleJSONLDURLs:function(){return[{url:"examples/brochu_2003.jsonld",title:"Brochu 2003"}]}},mounted:function(){"#demo"==window.location.hash&&this.demo()},methods:{getSpecifiersForPhyloref:function(e){var t=e.internalSpecifiers||[];return t.concat(e.externalSpecifiers||[])},getScinameForSpecifier:function(e){var t=new s.TaxonomicUnitWrapper(e).label;if(!t.startsWith("Specimen")){var n=t.match(/^\w+ [a-z-]+/);return n?n[0]:void 0}},getOTTId:function(e){var t=this.ottInfoByName[this.getScinameForSpecifier(e)];if(t&&t.length>0)return t[0]["taxon"]["ott_id"]},downloadInducedSubtreeFromOToL:function(e,t){var n=this;if(0!==e.length)return a.default.set(this,"speciesByNodeId",{}),a.default.set(this,"gbifBySpeciesName",{}),a.default.set(this,"unknownOttIds",[]),a.default.set(this,"unknownOttIdReasons",{}),o.default.ajax({type:"POST",url:this.$config.OTT_API_INDUCED_SUBTREE,data:JSON.stringify({ott_ids:e}),contentType:"application/json; charset=utf-8",dataType:"json",success:function(e){n.newick=e.newick,t&&t(e.newick)}}).fail((function(s){var a=/^\[\/v3\/tree_of_life\/induced_subtree\] Error: node_id '\w+' was not found!/;if(a.test(s.responseJSON.message)){var i=s.responseJSON.unknown;console.log("The Open Tree synthetic tree does not contain the following nodes: ",i),n.unknownOttIdReasons=i,n.unknownOttIds=(0,r.keys)(i);var l=e.filter((function(e){return!(0,r.has)(i,"ott"+e)}));console.log("Query has been reduced to the following nodes: ",l),o.default.ajax({type:"POST",url:n.$config.OTT_API_INDUCED_SUBTREE,data:JSON.stringify({ott_ids:l}),contentType:"application/json; charset=utf-8",dataType:"json",success:function(e){n.newick=e.newick,t&&t(e.newick)}}).fail((function(e){return console.log("Error accessing Open Tree induced_subtree",e)}))}else console.log("Error accessing Open Tree induced_subtree",s)}))},queryOTTIds:function(){var e=this,t=this.allSpecifiers.map((function(t){return e.getScinameForSpecifier(t)}));return this.queryOTTIdsForNames({names:t})},queryOTTIdsForNames:function(e){var t=this,n=function(e){e.forEach((function(e){if((0,r.has)(e,"name")&&e.name&&(0,r.has)(e,"matches")&&e.matches&&e.matches.length>0){var n=e.name.trim();a.default.set(t.ottInfoByName,n,e["matches"]||[])}}))},s=(0,r.uniq)(e.names).filter((function(e){return void 0!==e&&null!==e})).sort();return n(s.map((function(e){return{name:e,matches:[]}}))),Promise.all((0,r.chunk)(s,999).flatMap((function(r){e.names=r;var s=JSON.stringify(e);return o.default.ajax({type:"POST",url:t.$config.OTT_API_TNRS_MATCH_NAMES,data:s,contentType:"application/json; charset=utf-8",dataType:"json",success:function(e){n(e.results)}}).fail((function(e){return console.log("Error accessing Open Tree Taxonomy",e)}))})))},convertTUtoRestriction:function(e){return[new s.TaxonomicUnitWrapper(e).asJSONLD]},getPhylorefsAndPhylogenyAsOntology:function(){var e=this,t=this.phylorefs.filter((function(e){return(0,r.has)(e,"equivalentClass")}));t.forEach((function(t){t["@id"]=e.ONTOLOGY_BASEURI+"phyloref_"+(0,r.uniqueId)(),(0,r.has)(t,"@context")||(t["@context"]=e.PHYX_CONTEXT_JSON)}));var n=new s.PhylogenyWrapper({newick:this.newick}).getNodesAsJSONLD(this.ONTOLOGY_BASEURI+"phylogeny");this.nodesByID={},n.forEach((function(t){var n=t;n["@context"]=e.PHYX_CONTEXT_JSON,(0,r.has)(n,"@type")||(n["@type"]=[]),Array.isArray(n["@type"])||(n["@type"]=[n["@type"]]),(0,r.has)(n,"representsTaxonomicUnits")&&n.representsTaxonomicUnits.forEach((function(t){e.convertTUtoRestriction(t).forEach((function(t){n["@type"].push({"@type":e.OWL_RESTRICTION,onProperty:e.CDAO_REPRESENTS_TU,someValuesFrom:t})}))})),n["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"]=n["@type"].map((function(e){return(0,r.isString)(e)?{"@id":e}:e})),delete n["@type"],e.nodesByID[n["@id"]]=n}));var o=[{"@context":this.PHYX_CONTEXT_JSON,"@id":this.ONTOLOGY_BASEURI,"@type":this.OWL_ONTOLOGY,"owl:imports":this.OWL_IMPORTS}];return JSON.stringify(o.concat(t).concat(n),null,4)},downloadAsJSONLD:function(){var e=[this.getPhylorefsAndPhylogenyAsOntology()],t=new File(e,"download.jsonld",{type:"application/json;charset=utf-8"});(0,l.saveAs)(t)},reasonOverPhylogeny:function(){if(!this.reasoningInProgress){this.reasoningInProgress=!0,this.reasoningResults={};var t=this;a.default.nextTick((function(){var n=t.getPhylorefsAndPhylogenyAsOntology(),s=c.default.gzipSync(n),a=o.default.param({jsonldGzipped:e.from(s).toString("base64")}).replace(/%20/g,"+"),l=(0,i.signer)({algorithm:"sha1",secret:t.$config.JPHYLOREF_X_HUB_SIGNATURE_SECRET}),f=l(new e(a));console.log("Query: ",a),console.log("Signature: ",f),o.default.post({url:t.$config.JPHYLOREF_SUBMISSION_URL,data:a,headers:{"X-Hub-Signature":f}}).done((function(e){t.reasoningResults=e.phylorefs})).fail((function(e,t,n){var o=n;(0,r.has)(e,"responseJSON")&&(0,r.has)(e.responseJSON,"error")&&(o=e.responseJSON.error),void 0!==o&&""!==o||(o="unknown error"),alert("Error occurred on server while reasoning: ".concat(o))})).always((function(){t.reasoningInProgress=!1}))}))}},loadJSONLDFromURL:function(e){var t=this;return o.default.getJSON(e).done((function(e){t.extractPhylorefsFromJSONLD(e)})).fail((function(t){200===t.status?alert("Could not load JSON-LD file '".concat(e,"': file malformed, see console for details.")):alert("Could not load JSON-LD file '".concat(e,"': server error ").concat(t.status," ").concat(t.statusText," from ").concat(JSON.stringify(t)))}))},loadJSONLDFromFileInputById:function(e){var t=this;if("function"===typeof window.FileReader){var n=(0,o.default)(e);if(n)if(n.prop("files")){var r=n.prop("files");if(0!==r.length)for(var s=0;s<r.length;s++){var a=r.item(s),i=new FileReader;i.onload=function(e){var n=e.target.result,r=JSON.parse(n);t.extractPhylorefsFromJSONLD(r)},i.readAsText(a)}else alert("Please select a file before attempting to load it.")}else alert("File input element found, but files property missing: try another browser?");else alert("Programmer error: No file input element specified.")}else alert("The FileReader API is not supported on this browser.")},extractPhylorefsFromJSONLD:function(e){var t=this,n=function(e){void 0===t.phylorefs.find((function(t){return(0,r.isEqual)(t,e)}))&&t.phylorefs.push(e)};Array.isArray(e)&&e.forEach((function(e){return t.extractPhylorefsFromJSONLD(e)})),(0,r.has)(e,"phylorefs")&&Array.isArray(e.phylorefs)&&e.phylorefs.forEach((function(e){return n(e)})),(0,r.has)(e,"subClassOf")&&(Array.isArray(e.subClassOf)&&e.subClassOf.includes("phyloref:Phyloreference")&&n(e),"phyloref:Phyloreference"===e.subClassOf&&n(e))},getNodeIdForPhyloref:function(e){if(e){var t=e["@id"];if(t&&(0,r.has)(this.reasoningResults,t)){var n=this.nodesByID[this.reasoningResults[t][0]];if(!n)return;var o=this.getNodeLabel(n);if(!o)return;var s=/^.*[_\s](.*?ott.*)$/.exec(o);if(null==s){var a=/^mrca.*$/.exec(o);if(null==a)return;return a[0].toString()}return s[1].toString()}}},getNodeLabel:function(e){var t=e.labels||[];if(0!=t.length)return t[0]},downloadSpeciesForPhyloref:function(e){var t=this,n=this.getNodeIdForPhyloref(e);if(n&&!(0,r.has)(this.speciesByNodeId,n)&&!(0,r.has)(e,"species"))return a.default.set(e,"species",[]),o.default.post({url:this.$config.OTT_API_SUBTREE,contentType:"application/json; charset=utf-8",data:JSON.stringify({node_id:n,format:"arguson",height_limit:-1})}).done((function(n){console.log("Data retrieved: ",n);var r=function n(r){r&&(r.taxon&&r.taxon.rank&&"species"==r.taxon.rank&&(t.speciesByNodeId[r.node_id]=v({node_id:r.node_id},r.taxon),e.species.push(r.node_id)),r.children&&r.children.forEach(n))};r(n.arguson),console.log("Found species for phyloref: ",e.species)})),[]},downloadFromGBIF:function(e){var t=this;if(e.species){var n=e.species.map((function(e){return t.speciesByNodeId[e].name}));n.forEach((function(e){console.log("Querying GBIF for species name: ",e),o.default.get({url:t.$config.GBIF_API_OCCURRENCE,data:{scientificName:e,rank:"SPECIES"}}).done((function(n){console.log("Data retrieved: ",n),a.default.set(t.gbifBySpeciesName,e,{count:n.count,speciesKey:Array.from(new Set(n.results.map((function(e){return e.speciesKey}))))})}))}))}},demo:function(){var e=this;this.loadJSONLDFromURL(this.exampleJSONLDURLs[0].url).done((function(){e.queryOTTIds().then((function(){e.downloadInducedSubtreeFromOToL(e.ottIdsForAllSpecifiers,(function(){e.reasonOverPhylogeny()}))}))}))}}};t.default=g}).call(this,n("b639").Buffer)},"1d07":function(e,t,n){"use strict";n.r(t);var r=n("6b40"),o=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,(function(){return r[e]}))}(s);t["default"]=o.a},2:function(e,t){},"23be":function(e,t,n){"use strict";n.r(t);var r=n("199c"),o=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,(function(){return r[e]}))}(s);t["default"]=o.a},3:function(e,t){},"32ae":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={name:"TopNavigationBar",props:{version:{type:String,default:"unversioned"}}};t.default=r},"3dfd":function(e,t,n){"use strict";n.r(t);var r=n("b1e7"),o=n("23be");for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);n("034f");var a=n("2877"),i=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,null,null);t["default"]=i.exports},4:function(e,t){},4360:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=s(n("2b0e")),o=s(n("2f62"));function s(e){return e&&e.__esModule?e:{default:e}}r.default.use(o.default);var a=!1,i=new o.default.Store({state:{},modules:{},strict:a});t.default=i},4678:function(e,t,n){var r={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function o(e){var t=s(e);return n(t)}function s(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=s,e.exports=o,o.id="4678"},"56d7":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(n("2b0e"));n("4989");var o=l(n("5f5b"));n("ab8b"),n("177c");var s=l(n("252c"));n("6eb0");var a=l(n("3dfd")),i=l(n("4360"));function l(e){return e&&e.__esModule?e:{default:e}}window.$=n("1157"),r.default.prototype.$config=n("db49"),r.default.use(o.default),r.default.use(s.default),r.default.config.productionTip=!1;var c=new r.default({el:"#app",store:i.default,render:function(e){return e(a.default)}});t.default=c},"5c92":function(e,t,n){"use strict";n.r(t);var r=n("32ae"),o=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,(function(){return r[e]}))}(s);t["default"]=o.a},"5ea0":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={name:"AboutOpenTreeResolverModal"};t.default=r},"64a9":function(e,t,n){},"6b40":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("2ef0"),o=n("9068"),s={name:"PhylorefTable",props:{phylorefs:{type:Array,default:function(){return[]}},ottInfoBySpecifierLabel:{type:Object,default:function(){return{}}},reasoningResults:{type:Object,default:function(){return{}}},nodesByID:{type:Object,default:function(){return{}}},unknownOttIdReasons:{type:Object,default:function(){return{}}}},methods:{getURLForOTNode:function(e){var t=e["@id"];if(t&&(0,r.has)(this.reasoningResults,t)){var n=this.nodesByID[this.reasoningResults[t][0]];if(!n)return;var o=this.getNodeLabel(n);if(!o)return;var s=/^.*[_\s](.*?ott.*)$/.exec(o);if(null==s){var a=/^mrca.*$/.exec(o);if(null==a)return;return"https://tree.opentreeoflife.org/opentree/@"+a[0]}return"https://tree.opentreeoflife.org/opentree/@"+s[1]}},getLabelForOTNode:function(e){var t=e["@id"];if(t&&(0,r.has)(this.reasoningResults,t)&&this.reasoningResults[t].length>0){var n=this.nodesByID[this.reasoningResults[t][0]];if(!n)return;return this.getNodeLabel(n)}},getNodeLabel:function(e){var t=e.labels||[];if(0!=t.length)return t[0]},getPhylorefDescription:function(e){var t=e.cladeDefinition||e["obo:IAO_0000115"]||"None";return t.replace(/\n+/g,"<br />")},getOTTId:function(e){var t=this.ottInfoBySpecifierLabel[new o.TaxonomicUnitWrapper(e).label];if(t&&t.length>0)return t[0]["taxon"]["ott_id"]},getSpecifierType:function(e,t){return-1!==(e.internalSpecifiers||[]).indexOf(t)?"includes":-1!==(e.externalSpecifiers||[]).indexOf(t)?"excludes":"unknown"},getSpecifiersForPhyloref:function(e){var t=e.internalSpecifiers||[];return t.concat(e.externalSpecifiers||[])},getLabelForSpecifierAsHTML:function(e){var t=new o.TaxonomicUnitWrapper(e).label;return t?t.startsWith("Specimen")?t:t.replace(/^\w+ [a-z-]+/,"<em>$&</em>"):"(could not read)"}}};t.default=s},"809d":function(e,t,n){"use strict";n.r(t);var r=n("5ea0"),o=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,(function(){return r[e]}))}(s);t["default"]=o.a},"810f":function(e,t,n){"use strict";n.r(t);var r=n("0417"),o=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,(function(){return r[e]}))}(s);t["default"]=o.a},"8a2a":function(e,t,n){"use strict";var r=n("0fed"),o=n.n(r);o.a},9974:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("nav",{staticClass:"navbar navbar-expand navbar-dark bg-dark mb-2 fixed-top"},[n("a",{staticClass:"navbar-brand",attrs:{href:"index.html"}},[e._v("\n      Open Tree Resolver "),n("small",[e._v(e._s(e.version))])]),e._m(0)])])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"collapse navbar-collapse"},[n("ul",{staticClass:"navbar-nav"},[n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link",attrs:{href:"#",onclick:"$('#about-open-tree-resolver').modal()"}},[e._v("\n            About this tool\n          ")])]),n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link",attrs:{href:"https://www.phyloref.org/"}},[e._v("\n            Phyloreferencing website\n          ")])]),n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link",attrs:{href:"https://github.com/phyloref/open-tree-resolver"}},[e._v("\n            Github repository\n          ")])]),n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link",attrs:{href:"https://github.com/phyloref/open-tree-resolver/issues"}},[e._v("\n            Report bug\n          ")])])])])}];n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}))},"9b34":function(e,t,n){"use strict";n.r(t);var r=n("ec6b"),o=n("1d07");for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);var a=n("2877"),i=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,null,null);t["default"]=i.exports},b1e7:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("TopNavigationBar",{attrs:{version:e.version}}),n("div",{attrs:{id:"wrapper"}},[n("div",{staticClass:"card border-dark"},[n("h5",{staticClass:"card-header border-dark"},[e._v("\n        Phyloreferences\n      ")]),n("div",{staticClass:"card-body p-0"},[n("PhylorefTable",{attrs:{phylorefs:e.phylorefs,ottInfoBySpecifierLabel:e.ottInfoBySpecifierLabel,reasoningResults:e.reasoningResults,nodesByID:e.nodesByID,unknownOttIdReasons:e.unknownOttIdReasons}})],1),n("div",{staticClass:"card-footer"},[n("div",{staticClass:"btn-group",attrs:{role:"group","area-label":"Add phyloreferences"}},[n("button",{staticClass:"btn btn-primary",attrs:{href:"javascript:;",onclick:"$('#load-jsonld').trigger('click')"}},[e._v("\n            Import from ontology in JSON-LD\n          ")]),n("input",{staticClass:"d-none",attrs:{id:"load-jsonld",type:"file",multiple:"true"},on:{change:function(t){return e.loadJSONLDFromFileInputById("#load-jsonld")}}}),n("button",{staticClass:"btn btn-secondary dropdown-toggle",attrs:{type:"button",id:"addFromExamples","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[e._v("\n            Add phyloreferences from example\n          ")]),n("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"addFromExamples"}},e._l(e.exampleJSONLDURLs,(function(t){return n("a",{key:t.url,staticClass:"dropdown-item",attrs:{href:"javascript:;"},on:{click:function(n){return e.loadJSONLDFromURL(t.url)}}},[e._v("\n              "+e._s(t.title)+"\n            ")])})),0)]),n("div",{staticClass:"btn-group ml-2",attrs:{role:"group","area-label":"Actions on phyloreferences"}},[n("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(t){e.phylorefs=[],e.reasoningResults={}}}},[e._v("\n            Clear phylorefs\n          ")])]),n("div",{staticClass:"btn-group ml-2",attrs:{role:"group","area-label":"Open Tree Taxonomy tasks"}},[n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.queryOTTIds()}}},[e._v("\n            Query specifiers against Open Tree of Life Taxonomy\n          ")])])])]),n("div",{staticClass:"card border-dark mt-2"},[n("h5",{staticClass:"card-header border-dark"},[e._v("\n        Phylogeny\n      ")]),n("div",{staticClass:"card-body"},[n("form",[n("div",{staticClass:"form-group row"},[n("label",{staticClass:"col-md-2 control-label",attrs:{for:"newick"}},[e._v("\n              Newick\n            ")]),n("div",{staticClass:"col-md-10 input-group"},[n("textarea",{directives:[{name:"model",rawName:"v-model.lazy",value:e.newick,expression:"newick",modifiers:{lazy:!0}}],staticClass:"form-control",attrs:{rows:"3",placeholder:"Enter Newick string for phylogeny here"},domProps:{value:e.newick},on:{change:function(t){e.newick=t.target.value}}})])]),e.unknownOttIds.length>0?n("div",{staticClass:"form-group row"},[n("label",{staticClass:"col-md-2 control-label",attrs:{for:"newick"}},[e._v("\n              Taxa with Open Tree IDs but not on the synthetic tree\n            ")]),n("div",{staticClass:"col-md-10 input-group"},[e._l(e.unknownOttIds,(function(t,r){return[n("a",{key:"unknownOttIds_a_"+t,attrs:{target:"_blank",href:"https://tree.opentreeoflife.org/taxonomy/browse?id="+t.substring(3)}},[e._v(e._s(t))]),r+1<e.unknownOttIds.length?n("span",{key:"unknownOttIds_span_"+t,staticClass:"pr-1"},[e._v(",")]):e._e()]}))],2)]):e._e()])]),n("div",{staticClass:"card-footer"},[n("div",{staticClass:"btn-group",attrs:{role:"group","area-label":"Look up trees on the Open Tree of Life"}},[n("button",{staticClass:"btn btn-primary",attrs:{href:"javascript:;"},on:{click:function(t){return e.downloadInducedSubtreeFromOToL(e.ottIdsForAllSpecifiers)}}},[e._v("\n            Download induced subtree from the Open Tree of Life\n          ")])])])]),n("div",{staticClass:"card border-dark mt-2"},[n("h5",{staticClass:"card-header"},[e._v("\n        Phylogeny visualization\n      ")]),n("div",{staticClass:"card-body"},[n("Phylotree",{attrs:{newick:e.newick,baseURIForPhylogeny:e.ONTOLOGY_BASEURI+"phylogeny"}})],1),n("div",{staticClass:"card-footer"},[n("div",{staticClass:"btn-group",attrs:{role:"group","area-label":"Reason over phylogeny"}},[n("button",{staticClass:"btn btn-primary",attrs:{href:"javascript:;"},on:{click:function(t){return e.reasonOverPhylogeny()}}},[e._v("\n            Reason over phylogeny "),e.reasoningInProgress?n("span",[n("em",[e._v("(in progress)")])]):e._e()]),n("button",{staticClass:"btn btn-secondary",attrs:{href:"javascript:;"},on:{click:function(t){return e.downloadAsJSONLD()}}},[e._v("\n            Download as ontology\n          ")])])])]),n("div",{staticClass:"card border-dark mt-2"},[n("h5",{staticClass:"card-header"},[e._v("\n        Species in clade\n      ")]),n("div",{staticClass:"card-body"},[n("form",[n("div",{staticClass:"form-group row"},[n("label",{staticClass:"col-md-3 control-label",attrs:{for:"clade-select"}},[e._v("\n              Select a resolved clade from the table above:\n            ")]),n("div",{staticClass:"col-md-9 input-group"},[n("select",{attrs:{id:"clade-select"}},[n("option",{on:{click:function(t){e.selectedPhyloref=void 0}}},[e._v("Clear")]),e._l(e.phylorefs,(function(t,r){return[n("option",{on:{click:function(n){e.selectedPhyloref=t,e.downloadSpeciesForPhyloref(t)}}},[e._v(e._s(t.label||"Phyloref "+(r+1))),e.getNodeIdForPhyloref(t)?e._e():n("span",[e._v(" (not resolved)")])])]}))],2)])]),e.getNodeIdForPhyloref(e.selectedPhyloref)?n("div",{staticClass:"form-group row"},[n("div",{staticClass:"col-md-3 control-label"},[e._v("\n              Resolved to:\n            ")]),n("div",{staticClass:"col-md-9 input-group"},[n("a",{attrs:{target:"_blank",href:"https://tree.opentreeoflife.org/opentree/@"+e.getNodeIdForPhyloref(e.selectedPhyloref)}},[e._v(e._s(e.getNodeIdForPhyloref(e.selectedPhyloref)))])])]):e._e(),e.getNodeIdForPhyloref(e.selectedPhyloref)?n("div",{staticClass:"form-group row"},[n("div",{staticClass:"col-md-3 control-label"},[e._v("\n              Included species:\n            ")]),n("div",{staticClass:"col-md-9 input-group"},[n("table",{attrs:{border:"1"}},[e._m(0),n("tbody",e._l(e.selectedPhyloref.species,(function(t,r){return n("tr",[n("td",[e._v(e._s(t))]),n("td",[e._v(e._s(e.speciesByNodeId[t].name))]),e.gbifBySpeciesName&&e.speciesByNodeId[t]&&e.speciesByNodeId[t].name&&e.gbifBySpeciesName[e.speciesByNodeId[t].name]?n("td",[e._l(e.gbifBySpeciesName[e.speciesByNodeId[t].name].speciesKey,(function(t){return[n("a",{attrs:{target:"_blank",href:"http://gbif.org/species/"+t}},[e._v(e._s(t))]),n("br")]}))],2):e._e(),e.gbifBySpeciesName&&e.speciesByNodeId[t]&&e.speciesByNodeId[t].name&&e.gbifBySpeciesName[e.speciesByNodeId[t].name]?n("td",[e._v(e._s(e.gbifBySpeciesName[e.speciesByNodeId[t].name].count))]):e._e()])})),0)])])]):e._e()])]),e.getNodeIdForPhyloref(e.selectedPhyloref)?n("div",{staticClass:"card-footer"},[n("div",{staticClass:"btn-group",attrs:{role:"group","area-label":"Query biodiversity databases"}},[n("button",{staticClass:"btn btn-primary",attrs:{href:"javascript:;"},on:{click:function(t){return e.downloadFromGBIF(e.selectedPhyloref)}}},[e._v("\n            Query information from GBIF\n          ")])])]):e._e()])]),n("AboutOpenTreeResolverModal")],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",[n("th",[e._v("Node ID")]),n("th",[e._v("Name")]),n("th",[e._v("GBIF Species ID")]),n("th",[e._v("GBIF occurrence count")])])}];n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}))},c0e6:function(e,t,n){"use strict";n.r(t);var r=n("e16a"),o=n("810f");for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);n("8a2a");var a=n("2877"),i=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,null,null);t["default"]=i.exports},db49:function(e,t,n){"use strict";e.exports={JPHYLOREF_SUBMISSION_URL:"https://reasoner.phyloref.org/reason",JPHYLOREF_X_HUB_SIGNATURE_SECRET:"undefined",OTT_API_TNRS_MATCH_NAMES:"https://api.opentreeoflife.org/v3/tnrs/match_names",OTT_API_SUBTREE:"https://api.opentreeoflife.org/v3/tree_of_life/subtree",OTT_API_INDUCED_SUBTREE:"https://api.opentreeoflife.org/v3/tree_of_life/induced_subtree",GBIF_API_OCCURRENCE:"https://api.gbif.org/v1/occurrence/search"}},e16a:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.newickErrors.length>0?[e._l(e.newickErrors,(function(t,r){return[n("p",{key:r},[n("strong",[e._v(e._s(t.title)+".")]),e._v(" "+e._s(t.message))])]}))]:n("div",{staticClass:"phylotreeContainer"},[n("svg",{staticClass:"col-md-12 phylogeny",attrs:{id:"phylogeny_"+e.phylogenyIndex}}),n("ResizeObserver",{on:{notify:function(t){return e.redrawTree()}}})],1)],2)},o=[];n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}))},ec6b:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{staticClass:"table table-hover table-flush mb-0"},[e._m(0),n("tbody",[0===e.phylorefs.length?n("tr",{staticClass:"bg-white"},[n("td",{attrs:{colspan:"5"}},[n("center",[n("em",[e._v("No phyloreferences loaded")])])],1)]):e._e(),e._l(e.phylorefs,(function(t,r){return[0===e.getSpecifiersForPhyloref(t).length?[n("tr",{key:"phyloref_"+r},[n("td",[e._v("\n            "+e._s(t.label||"Phyloref "+(r+1))+"\n          ")]),n("td",[n("span",{domProps:{innerHTML:e._s(e.getPhylorefDescription(t))}})]),n("td",[e._v(" ")]),n("td",[n("center",[n("em",[e._v("No specifiers provided.")])])],1),n("td",[e._v(" ")])])]:[e._l(e.getSpecifiersForPhyloref(t),(function(o,s){return[n("tr",{key:"phyloref_"+r+"_specifier_"+s},[0===s?[n("td",{attrs:{rowspan:e.getSpecifiersForPhyloref(t).length}},[e._v("\n                "+e._s(t.label||"Phyloref "+(r+1))+"\n              ")]),n("td",{attrs:{rowspan:e.getSpecifiersForPhyloref(t).length}},[n("span",{domProps:{innerHTML:e._s(e.getPhylorefDescription(t))}})]),n("td",{attrs:{rowspan:e.getSpecifiersForPhyloref(t).length}},[n("a",{attrs:{target:"_blank",href:e.getURLForOTNode(t)}},[e._v(e._s(e.getLabelForOTNode(t)))])])]:e._e(),n("td",[e._v("\n              "+e._s(e.getSpecifierType(t,o))+"\n              "),n("span",{domProps:{innerHTML:e._s(e.getLabelForSpecifierAsHTML(o))}})]),n("td",[e.getOTTId(o)?[n("a",{attrs:{target:"_blank",href:"https://tree.opentreeoflife.org/opentree/@ott"+e.getOTTId(o)}},[e._v(e._s(e.getOTTId(o)))]),e._v("\n                ("),n("a",{attrs:{target:"_blank",href:"https://tree.opentreeoflife.org/taxonomy/browse?id="+e.getOTTId(o)}},[e._v("ott")]),e._v(")\n                "),e.unknownOttIdReasons["ott"+e.getOTTId(o)]?n("span",[n("br"),e._v("Not in synthetic tree: "+e._s(e.unknownOttIdReasons["ott"+e.getOTTId(o)])+"\n                ")]):e._e()]:e._e()],2)],2)]}))]]}))],2)])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",[n("th",{attrs:{width:"15%"}},[e._v("Name")]),n("th",{attrs:{width:"40%"}},[e._v("Description")]),n("th",[e._v("Resolved Open Tree node")]),n("th",[e._v("Specifiers")]),n("th",[e._v("Open Tree Taxonomy ID")])])}];n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}))},f7af:function(e,t,n){"use strict";n.r(t);var r=n("9974"),o=n("5c92");for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);var a=n("2877"),i=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,null,null);t["default"]=i.exports},f845:function(e,t,n){"use strict";n.r(t);var r=n("054c"),o=n("809d");for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);var a=n("2877"),i=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,null,null);t["default"]=i.exports}});
//# sourceMappingURL=app.4cf77f5c.js.map