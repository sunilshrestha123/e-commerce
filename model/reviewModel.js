const mongoose = require('mongoose');
// const Tour = require('./tourModel');
// const User = require('./userModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'please enter the review'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'reviewd must belongs to tour '],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'reviwd must belongs to User '],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour ',
  //   select: 'name ',
  // }).populate({
  //   path: 'user ',
  //   select: 'name  photo',
  // });
  this.populate({
    path: 'user ',
    select: 'name  photo',
  });
  next();
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
