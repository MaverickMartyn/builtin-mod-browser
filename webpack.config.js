let webpack = require('vortex-api/bin/webpack').default;
var path = require('path');
const config = webpack('builtin-mod-browser', __dirname, 4);
if (!!config.module.rules) {
  config.module.rules.push({
    test: /\.css$/i,
    use: [
      "style-loader",
      "@teamsupercell/typings-for-css-modules-loader",
      {
        loader: "css-loader",
        options: { modules: true }
      }
    ]
  });
} else {
  config.module.rules = [
    {
      test: /\.css$/i,
      use: [
        "style-loader",
        "@teamsupercell/typings-for-css-modules-loader",
        {
          loader: "css-loader",
          options: { modules: true }
        }
      ]
    }
  ];
}
module.exports = config;
