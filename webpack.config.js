const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/main.ts",
  },
  output: {
    path: dist,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [/node_modules/, /lib/],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    static: dist,
    open: false,
  },
  plugins: [new CopyPlugin([path.resolve(__dirname, "static")])],
  experiments: {
    asyncWebAssembly: true,
  },
};
