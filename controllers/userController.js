const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    // requestTime: req.requestTime,
    result: users.length,
    data: { users },
  });
});

exports.CreateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    mesage: 'this route is not define yetr ',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    mesage: 'this route is not define yetr ',
  });
};
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: false,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  req.status(204).json({
    sataus: 'sucess',
    data: null,
  });
});
exports.UpdateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    mesage: 'this route is not define yetr ',
  });
};
exports.DeleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    mesage: 'this route is not define yetr ',
  });
};
