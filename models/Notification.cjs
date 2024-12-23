const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    productID: { type: String, required: true },
    productName: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);