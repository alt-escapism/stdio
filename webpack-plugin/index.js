const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = function () {
  return new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "../dist/app"),
        to: "stdio",
      },
    ],
  });
};
