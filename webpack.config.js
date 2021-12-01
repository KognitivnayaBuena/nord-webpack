const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx|ts?$/,
        loader: "babel-loader",
        include: /src/,
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
  devtool: "cheap-source-map",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.main.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "./src"),
    compress: true,
    port: 3000,
  },
};
