const mongoose = require('mongoose');
const Sales = require('./Sales.cjs'); // Ensure Sales model contains sales data

const reportSchema = new mongoose.Schema({
  title: String,
  content: String,
  // Add fields as necessary for additional metadata
});

// Static methods for generating sales reports

// Sales by Month
reportSchema.statics.getSalesByMonth = async function (year) {
  return await Sales.aggregate([
    { $match: { date: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year + 1}-01-01`) } } },
    { $group: { _id: { $month: '$date' }, totalSales: { $sum: '$amount' } } },
    { $sort: { _id: 1 } },
  ]);
};

// Sales by Year
reportSchema.statics.getSalesByYear = async function () {
  return await Sales.aggregate([
    { $group: { _id: { $year: '$date' }, totalSales: { $sum: '$amount' } } },
    { $sort: { _id: 1 } },
  ]);
};

// Top-Selling Products
reportSchema.statics.getTopSellingProducts = async function (limit = 5) {
  return await Sales.aggregate([
    { $unwind: '$products' },
    { $group: { _id: '$products.productId', totalQuantity: { $sum: '$products.quantity' } } },
    { $sort: { totalQuantity: -1 } },
    { $limit: limit },
  ]);
};

// Sales by Category
reportSchema.statics.getSalesByCategory = async function () {
  return await Sales.aggregate([
    { $unwind: '$products' },
    {
      $lookup: {
        from: 'products',
        localField: 'products.productId',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    { $unwind: '$productDetails' },
    { $group: { _id: '$productDetails.category', totalSales: { $sum: '$products.amount' } } },
    { $sort: { totalSales: -1 } },
  ]);
};

// Custom Sales Trends
reportSchema.statics.getCustomSalesTrends = async function (startDate, endDate) {
  return await Sales.aggregate([
    { $match: { date: { $gte: new Date(startDate), $lt: new Date(endDate) } } },
    { $group: { _id: { $dayOfMonth: '$date' }, totalSales: { $sum: '$amount' } } },
    { $sort: { _id: 1 } },
  ]);
};

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
