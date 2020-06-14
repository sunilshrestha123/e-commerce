const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  heading: {
    type: string,
  },
  des: {
    type: String,
  },
  image: String,
  required: [true, 'please enter the image '],
});
const Slide = mongoose.model('Slide', sideSchema);
module.exports = Slide;
