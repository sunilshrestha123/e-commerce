const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter the full name'],
  },
  email: {
    type: String,
    required: [true, 'please Enter the email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'please enter the password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please enter confirm  password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not  the same ',
    },
  },
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 16);
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;
