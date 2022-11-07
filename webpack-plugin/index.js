const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = function (config) {
  const indexHtmlPath = path.resolve(__dirname, "../dist/app/index.html");

  return new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "../dist/app"),
        to: "stdio",
        transform: (content, absoluteFilename) => {
          if (absoluteFilename === indexHtmlPath) {
            const replaced = config
              ? content
                  .toString()
                  .replace(
                    `<stdio-config></stdio-config>`,
                    `<stdio-config ${getConfigAsHTMLAttributes(
                      config
                    )}></stdio-config>`
                  )
              : content;
            return replaced;
          }
          return content;
        },
      },
    ],
  });
};

const configKeys = new Set(["project", "playground"]);

function getConfigAsHTMLAttributes(config) {
  return Object.entries(config)
    .filter(([key]) => configKeys.has(key))
    .map(([key, value]) => {
      return `${key}="${escape(value)}"`;
    })
    .join(" ");
}

function escape(text) {
  return text.replace(/"/g, "&quot;");
}
