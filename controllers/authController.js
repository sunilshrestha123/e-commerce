const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create(req.body);
  // console.log(data, newUser);
  res.status(201).json({
    status: 'success',
    data: {
      user: newsUser,
    },
  });
});
