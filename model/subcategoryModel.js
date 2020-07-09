const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  subcategory: {
    type: String,
    required: [true, 'please enter the sub category'],
  },
  category: [{ type: schema.types.ObjectId, ref: 'name' }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});
const Subcategory = mongoose.model('Subcategory', subcategorySchema);
module.exports = Subcategory;
