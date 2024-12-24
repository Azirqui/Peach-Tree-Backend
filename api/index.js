const app = require('../server.cjs'); // Adjust the path if necessary
const { createServer } = require('@vercel/node');

module.exports = createServer(app);
