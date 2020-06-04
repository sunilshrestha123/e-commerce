const Tour = require('./../model/tourModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
// const ApiFeatures = require('./../utils/apiFeatures');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
// exports.CheckID = (req, res, next, val) => {
//   console.log(`tour id is :${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(400).json({
//       status: 'faild',
//       message: 'invalis id ',
//     });
//   }
//   next();
// };
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     res.status(400).json({
//       status: 'faild',
//       message: 'missing name and price ',
//     });
//   }
//   next();
// };
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAlltours = async (req, res) => {
  // console.log(req.query);
  try {
    // const tours = await Tour.find(req.query);
    //1)filtering
    // const queryObj = { ...req.query };
    // const excludeFields = ['page', 'sort', 'limit', 'fields'];
    // excludeFields.forEach((el) => delete queryObj[el]);
    // const tours = await Tour.find(queryObj);
    ///2) ******advance filtering**********
    // let queryStr = JSON.stringify(queryObj);
    // queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));
    //{difficulty:'easy',duraion:{$gte:5}}
    //{difficulty:'easy',duraion:{gte:'5'}}
    // let query = Tour.find(JSON.parse(queryStr));
    //********SORTING********

    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   console.log(sortBy);
    //   query = query.sort(req.query.sort);
    // } else {
    //   query = query.sort('-createdAt');
    // }

    ///3 **** FIELD LIMITING****
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }

    // *******PAGINATION********
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    // if (req.query.page) {
    //   const numTour = await Tour.countDocuments();

    //   if (skip > numTour) throw new Error('the page doesnot exist ');
    // }

    ///excute query
    // const tours = await query;

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
    // const tours = await Tour.find();

    /////FIltering the best api way
    // const tour=await Tour.find(req.query)
    // const tours = await Tour.find({
    //   duration: 5,
    //   diffculty: 'easy',
    // });
    ///onaother way for data filtering
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    res.status(200).json({
      status: 'success',
      // requestTime: req.requestTime,
      result: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      message: err,
    });
  }
};
// const catchAsync = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };
exports.PostById = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'sucess',
    data: {
      tour: newTour,
    },
  });
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'faild',
  //     message: 'data failed to get  ',
  //   });

  // console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'sucess',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
});

exports.getById = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new AppError('No tour found with that id', 404));
  }
  // res.status(200).json({
  //   status: 'sucess',
  //   // result: tours.length,
  //   data: { tour },
  // });

  // )}
  // console.log(req.params);

  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // if (!tour) {
  //
  // }
});
exports.UpdateById = async (req, res) => {
  // if (req.params.id * 1 > tours.length) {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'update the tour',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      message: 'invalis id ',
    });
  }
};
exports.DeleteById = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body);
    res.status(204).json({
      status: 'data is deleted',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getAllStat = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numtours: { $sum: 1 },
          numRatings: { $avg: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      { $sort: { avgPrice: 1 } },
      {
        $match: { _id: { $ne: 'EASY' } },
      },
    ]);
    res.status(200).json({
      status: 'sucess',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
