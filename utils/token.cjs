const jwt = require('jsonwebtoken');
const { publicKey } = require('../config/keys.cjs'); // Load Ed25519 public key

// Verify a token using Ed25519 public key
const verifyToken = (token) => {
  try {
    return jwt.verify(token, publicKey, { algorithms: ['EdDSA'] });
  } catch (error) {
    throw new Error('Token verification failed');
  }
};

module.exports = { verifyToken };
