const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
const slugify = require('slugify');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'plase enter the titile'],
  },
  meta: {
    type: String,
    required: [true, 'please enter the meta tag'],
  },
  slug: String,
  heading: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});
pageSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Page = mongoose.model('page', pageSchema);
module.exports = Page;
