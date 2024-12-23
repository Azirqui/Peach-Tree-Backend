const app = require('../server'); // Adjust the path if necessary
const { createServer } = require('@vercel/node');

module.exports = createServer(app);
