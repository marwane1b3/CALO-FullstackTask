const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
};
