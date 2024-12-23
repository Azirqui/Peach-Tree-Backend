const generateSupplierId = () => {
    const segment1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const segment2 = Math.random().toString(36).substring(2, 9).toUpperCase();
    const segment3 = Math.random().toString(36).substring(2, 3).toUpperCase();
    return `${segment1}-${segment2}-${segment3}`;
  };
  
  module.exports = generateSupplierId;
  