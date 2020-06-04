const mongoose = require('mongoose');
const slugify = require('slugify');

const mainmenuSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'A menu needed'],
    unique: true,
    maxlength: [30, 'menu ttitle must be 30'],
  },
  parentId: {
    type: Number,
    default: null,
  },
  metatag: {
    type: String,
  },
  slug: String,

  content: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// DOCUMENT MIDDLEWARE: runs before .save() and .create()

mainmenuSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
// mainmenuSchema.pre('save', function (next) {
//   console.log('will save document');
//   next();
// });
// mainmenuSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

const MainMenu = mongoose.model('MainMenu', mainmenuSchema);
module.exports = MainMenu;
