const path = require("path");

module.exports = {
  // Outras configurações...
  resolve: {
    alias: {
      "styled-components": path.resolve(
        __dirname,
        "node_modules",
        "styled-components"
      ),
    },
  },
};
