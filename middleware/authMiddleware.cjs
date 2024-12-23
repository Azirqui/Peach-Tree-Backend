const { verifyJWT } = require('../utils/jwtUtils.cjs'); // Import the verifyJWT function

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'Access Denied: No token provided.' });
  }

  try {
    const decoded = verifyJWT(token); // Verify the token using Ed25519
    req.user = decoded; // Attach decoded payload to the request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticate;
