const fs = require('fs');
const crypto = require('crypto');

// Directory to save the keys
const keysDir = './config/keys';

// Ensure the keys directory exists
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true });
}

// Generate Ed25519 key pair
crypto.generateKeyPair('ed25519', (err, publicKey, privateKey) => {
  if (err) {
    console.error('Error generating keys:', err);const fs = require('fs');
    const crypto = require('crypto');
    
    // Directory to save the keys
    const keysDir = './config/keys';
    
    // Ensure the keys directory exists
    if (!fs.existsSync(keysDir)) {
      fs.mkdirSync(keysDir, { recursive: true });
    }
    
    // Generate Ed25519 key pair
    crypto.generateKeyPair('ed25519', {
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem', // PEM format for private key
      },
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem', // PEM format for public key
      }
    }, (err, publicKey, privateKey) => {
      if (err) {
        console.error('Error generating keys:', err);
        return;
      }
    
      // Save the private key to a file
      fs.writeFileSync(`${keysDir}/privateKey.key`, privateKey);
      console.log('Private Key saved to config/keys/privateKey.key');
    
      // Save the public key to a file
      fs.writeFileSync(`${keysDir}/publicKey.key`, publicKey);
      console.log('Public Key saved to config/keys/publicKey.key');
    });
    
    return;
  }

  // Convert KeyObject to PEM format
  const privateKeyPem = privateKey.export({ format: 'pem', type: 'pkcs8' });
  const publicKeyPem = publicKey.export({ format: 'pem', type: 'spki' });

  // Save the private key to a file
  fs.writeFileSync(`${keysDir}/privateKey.key`, privateKeyPem);
  console.log('Private Key saved to config/keys/privateKey.key');

  // Save the public key to a file
  fs.writeFileSync(`${keysDir}/publicKey.key`, publicKeyPem);
  console.log('Public Key saved to config/keys/publicKey.key');
});
