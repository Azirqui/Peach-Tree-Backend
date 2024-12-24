// server.cjs
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.cjs');
const { PORT } = require('./config/config.cjs');

// Importing Routes
const authRoutes = require('./routes/authRoutes.cjs');
const customerRoutes = require('./routes/customerRoutes.cjs');
const orderRoutes = require('./routes/orderRoutes.cjs');
const inventoryRoutes = require('./routes/inventoryRoutes.cjs');
const productRoutes = require('./routes/productRoutes.cjs');
const reportRoutes = require('./routes/reportRoutes.cjs'); // Reporting routes
const salesRoutes = require('./routes/salesRoutes.cjs');
const updateRoutes = require('./routes/updateRoutes.cjs');
const billRoutes = require('./routes/billRoutes.cjs'); // Bill management routes
const supplierRoutes = require('./routes/supplierRoutes.cjs');
const notificationRoutes = require ('./routes/notificationRoutes.cjs')
// Initialize Express App
const app = express();
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://peach-tree-frontend.vercel.app',
      'https://peach-tree-frontend.vercel.app/' // Include trailing slash version
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
// Middleware
 app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight requests

app.use(express.json()); // Parse JSON request bodies
// Connect to Database
connectDB();

// API Routes
app.use('/auth', authRoutes); // Authentication and Authorization
app.use('/api/customers', customerRoutes); // Customer-related operations
app.use('/api/orders', orderRoutes); // Order management
app.use('/api/inventory', inventoryRoutes); // Inventory operations
app.use('/api/products', productRoutes); // Product management
app.use('/api/reports', reportRoutes); // Reporting
app.use('/api/sales', salesRoutes); // Sales tracking
app.use('/api', updateRoutes); // General update operations
app.use('/api/bills', billRoutes); // Define the /api/bills route
app.use('/api/suppliers', supplierRoutes); // Supplier management
app.use('/api/notifications',notificationRoutes)
// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err : {}, // Avoid exposing error details in production
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
