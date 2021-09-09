module.exports = {
  presets: [
    // '@babel/preset-env',
    "@babel/preset-react",
  ],
  overrides: [
    {
      exclude: /(^|\/|\\)node_modules(\/|\/)/,
      presets: [
        [require.resolve("@babel/preset-typescript"), { jsxPragma: "h" }],
      ],
    },
  ],
  plugins: [
    ["@babel/plugin-proposal-optional-chaining", { loose: false }],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};
