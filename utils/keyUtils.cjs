const crypto = require('crypto');

// Function to generate Ed25519 key pair
const generateEd25519KeyPair = () => {
  // Generate the key pair
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');

  // Extract the raw 32-byte private key
  const pkcs8PrivateKeyBuffer = privateKey.export({ type: 'pkcs8', format: 'der' });
  const rawPrivateKey = pkcs8PrivateKeyBuffer.slice(pkcs8PrivateKeyBuffer.length - 32);

  // Extract the raw public key
  const spkiPublicKeyBuffer = publicKey.export({ type: 'spki', format: 'der' });
  const rawPublicKey = spkiPublicKeyBuffer.slice(spkiPublicKeyBuffer.length - 32);

  return { publicKey: rawPublicKey, privateKey: rawPrivateKey };
};

module.exports = { generateEd25519KeyPair };
