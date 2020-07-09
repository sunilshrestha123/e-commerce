const Category = require('../model/categoryModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
exports.getAllCategory = catchAsync(async (req, res, next) => {
  const getCategorys = await Category.find(req.body);
  res.status(200).json({
    status: 'sucess',
    data: {
      getCategorys,
    },
  });
});

exports.CreateCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  res.status(200).json({
    status: 'sucess',
    mesage: 'data is insert  ',
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError('No category with that id ', 404));
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      category: { category },
    },
  });
});

exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
