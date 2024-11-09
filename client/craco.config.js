const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      "@Style": path.resolve(__dirname, 'src/Style'),
    },
  },
};
