module.exports = function (api) {
  api.cache(true);
  const presets = [
    "@babel/typescript",
    [
      "@babel/preset-env",
      {
        corejs: {
          version: "3",
        },
        useBuiltIns: "usage",
        targets: {
          browsers: ["last 2 versions", "ie >= 11"],
        },
      },
    ],
    "@babel/react",
  ];
  const plugins = [
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ];
  return {
    presets,
    plugins,
  };
};
