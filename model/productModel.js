const mongoose = require('mongoose');

const productSchema = new.Schema({
  product_name: {
    type: String,
    required: [true, 'a pruct must have name'],
  },
  category: {},

  slug: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
