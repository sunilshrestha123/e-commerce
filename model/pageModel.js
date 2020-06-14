const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'plase enter the titile'],
  },
  slug: String,
  heading: {
    type: String,
  },
  image: {
    type: String,
  },
});
