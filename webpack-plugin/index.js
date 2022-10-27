const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = function ({ project, playground } = {}) {
  const indexHtmlPath = path.resolve(__dirname, "../dist/app/index.html");

  return new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "../dist/app"),
        to: "stdio",
        transform: (content, absoluteFilename) => {
          if (absoluteFilename === indexHtmlPath) {
            const replaced = content.toString().replace(
              "stdioConfig={}",
              `stdioConfig=${JSON.stringify({
                project,
                playground,
              })}`
            );
            return replaced;
          }
          return content;
        },
      },
    ],
  });
};
