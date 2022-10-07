const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/app/index.ts",
    inject: "./src/inject/index.ts",
    lib: { import: "./src/lib/index.ts", filename: "../[name].js" },
    embed: { import: "./src/embed/index.ts", filename: "../[name].js" },
  },
  output: {
    path: path.resolve(__dirname, "dist/app"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
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
      filename: "index.html",
    }),
  ],
};
