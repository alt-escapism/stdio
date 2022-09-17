const config = require("./webpack.config");

module.exports = {
  ...config,
  mode: "development",
  devServer: {
    hot: false,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
