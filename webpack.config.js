const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/app/index.tsx",
    shell: "./src/shell/index.ts",
    inject: "./src/shell/inject.ts",
    "inject-after": "./src/shell/inject-after.ts",
  },
  output: {
    path: path.resolve(__dirname, "./dist/app"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["app"],
      template: "./src/app/index.html",
      inject: "body",
      publicPath: "/stdio",
      filename: "app.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["shell"],
      template: "./src/shell/index.html",
      inject: "body",
      publicPath: "/stdio",
      filename: "index.html",
      scriptLoading: "blocking",
    }),
  ],
};
