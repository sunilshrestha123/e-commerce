const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: [true, 'Please enter the category '],
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
