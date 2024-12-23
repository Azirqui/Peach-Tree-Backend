const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nacl = require('tweetnacl');
const User = require('../models/userForm.cjs');

// Check if the username or email already exists
const checkAvailability = async (req, res) => {
  const { username, email } = req.body;

  try {
    const userByUsername = await User.findOne({ username });
    if (userByUsername) return res.status(400).json({ message: 'Username already exists.' });

    const userByEmail = await User.findOne({ email });
    if (userByEmail) return res.status(400).json({ message: 'Email already exists.' });

    return res.status(200).json({ message: 'Username and Email are available.' });
  } catch (error) {
    console.error('Availability check error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Handle user signup
const signup = async (req, res) => {
  const { username, email, password, fullName, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ message: 'Username or Email is already taken.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      role,
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Utility function to sign JWT
function signJWT(payload, secretKey) {
  if (secretKey.length !== 64) {
    throw new Error('Invalid secret key size. It should be 64 bytes.');
  }

  const encodedPayload = new TextEncoder().encode(JSON.stringify(payload));
  const signature = nacl.sign.detached(encodedPayload, secretKey);

  return jwt.sign({ ...payload, signature: Array.from(signature) }, 'your_jwt_secret', { expiresIn: '1h' });
}

// Handle user login
const login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: `You are a ${user.role}, you cannot log in as ${role}.` });
    }

    const keyPair = nacl.sign.keyPair();
    const { publicKey, secretKey } = keyPair;

    const token = signJWT({ username: user.username, role: user.role, publicKey: Array.from(publicKey) }, secretKey);

    return res.status(200).json({
      message: 'Login successful.',
      token,
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { signup, login, checkAvailability };
