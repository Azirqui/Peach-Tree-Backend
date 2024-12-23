// config/config.js

require('dotenv').config();  // Load environment variables from .env file

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000
};


// // Backend/config/config.cjs
// module.exports = {
//   MONGO_URI: 'your_mongodb_connection_string_here',
//   PORT: process.env.PORT || 5000,
//   JWT_SECRET_KEY: 'your_jwt_secret_key_here',
// };
