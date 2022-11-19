const config = require("./webpack.config");

module.exports = {
  ...config,
  mode: "development",
  devServer: {
    port: 3001,
    hot: false,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
