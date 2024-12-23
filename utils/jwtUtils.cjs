const crypto = require('crypto');
const nacl = require('tweetnacl');

// Function to convert PEM private key to raw Uint8Array for Ed25519 private key
const pemToRawPrivateKey = (pem) => {
  if (typeof pem === 'string') {
    try {
      const keyObject = crypto.createPrivateKey(pem);
      if (keyObject.asymmetricKeyType !== 'ed25519') {
        throw new Error('Unsupported key type. Expected Ed25519.');
      }
      const rawPrivateKey = keyObject.export({ type: 'pkcs8', format: 'der' });
      return rawPrivateKey.slice(rawPrivateKey.length - 32); // Get 32-byte raw key
    } catch (err) {
      throw new Error('Failed to process private key: ' + err.message);
    }
  }
  throw new Error('Invalid private key format. Expected PEM string.');
};

// Function to convert PEM public key to raw Uint8Array for Ed25519 public key
const pemToRawPublicKey = (pem) => {
  try {
    const keyObject = crypto.createPublicKey(pem);
    if (keyObject.asymmetricKeyType !== 'ed25519') {
      throw new Error('Unsupported key type. Expected Ed25519.');
    }
    const pkcs8Buffer = keyObject.export({ type: 'spki', format: 'der' });
    return pkcs8Buffer.slice(pkcs8Buffer.length - 32); // Get 32-byte raw key
  } catch (err) {
    throw new Error('Error extracting public key: ' + err.message);
  }
};

// Function to generate Ed25519 key pair using nacl
const generateEd25519KeyPair = () => {
  return nacl.sign.keyPair(); // Generate key pair with public and secret keys
};

// Function to verify a JWT with Ed25519
const verifyJWT = (token, publicKeyPem) => {
  const publicKey = pemToRawPublicKey(publicKeyPem);
  const [base64Header, base64Payload, base64Signature] = token.split('.');

  const dataToVerify = `${base64Header}.${base64Payload}`;
  const isVerified = nacl.sign.detached.verify(
    new TextEncoder().encode(dataToVerify),
    Buffer.from(base64Signature, 'base64url'),
    publicKey
  );

  if (isVerified) {
    return JSON.parse(Buffer.from(base64Payload, 'base64url').toString()); // Decode payload
  } else {
    throw new Error('Invalid Token');
  }
};

module.exports = { verifyJWT, generateEd25519KeyPair };
