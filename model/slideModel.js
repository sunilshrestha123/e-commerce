const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  des: {
    type: String,
  },
  photo: {
    type: String,
    required: [true, 'please enter the image '],
  },
  createAt: {
    type: Date,
    defaut: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});
const Slide = mongoose.model('Slide', slideSchema);
module.exports = Slide;
