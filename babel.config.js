module.exports = {
  presets: [
    // Used for Vue applications.
    [ '@vue/app', { useBuiltIns: 'entry' } ]
  ],
  plugins: [
    // Allows us to directly include modules that use CommonJS (like phyx.js).
    '@babel/plugin-transform-modules-commonjs',
  ],
};
