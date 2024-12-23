const fs = require('fs');

// Correct path to your newly generated Ed25519 private and public keys
const privateKeyPath = './config/keys/privateKey.key';
const publicKeyPath = './config/keys/publicKey.key';

// Read the private and public keys
let privateKey, publicKey;

try {
  // Read private key and public key
  privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  publicKey = fs.readFileSync(publicKeyPath, 'utf8');

  console.log('Private Key:', privateKey);
  console.log('Public Key:', publicKey);

  // Export the keys for use in other parts of your application
  module.exports = { privateKey, publicKey };
} catch (err) {
  console.error('Error reading keys:', err.message);
  // Handle the error if needed (e.g., exit or provide default values)
}
