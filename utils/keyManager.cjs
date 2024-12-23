// keyManager.cjs

let currentPrivateKey = null;
let currentPublicKey = null;

// Store the keys temporarily (in memory for the session)
const storeKeys = (privateKey, publicKey) => {
  currentPrivateKey = privateKey;
  currentPublicKey = publicKey;
};

// Retrieve the current keys (for verification during protected route access)
const getCurrentKeys = () => {
  return { privateKey: currentPrivateKey, publicKey: currentPublicKey };
};

module.exports = { storeKeys, getCurrentKeys };
