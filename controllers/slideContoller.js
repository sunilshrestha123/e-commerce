const multer = require('multer');
const sharp = require('sharp');
const Slide = require('./../model/slideModel');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
// exports.getAllSlide = catchAsync(async (req, res, next) => {
//   // res.status(500).json({
//   //   status: 'success',
//   //   data: {},
//   // });
// });

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('not an image ! please only image', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadSlide = upload.single('photo');
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  console.log(req.params);
  req.body.photo = `slide-${req.file.fieldname}-${Date.now()}-slide.jpeg`;
  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .toFile(`public/img/slide/${req.body.photo}`);
  next();
});
exports.createSlide = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const slide = await Slide.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: slide,
    },
  });
});
exports.getAllSlide = factory.getAll(Slide);
exports.getSlide = factory.getOne(Slide);
exports.updateSlide = factory.updateOne(Slide);
exports.deleteSlide = factory.deleteOne(Slide);
