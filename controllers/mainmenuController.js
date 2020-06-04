const Tour = require('../model/mainmenuModel');

exports.getAllMainMenu = async (req, res) => {
  try {
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
exports.CreateMainMenu = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'sucess',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      message: 'data failed to get  ',
    });
  }
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
};

exports.getMainMenu = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'sucess',
      // result: tours.length,
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: 'faild',
      message: 'invalis id ',
    });
  }
  // console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // if (!tour) {
  //
  // }
};
exports.UpdateMainMenu = async (req, res) => {
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
exports.DeleteMainMenu = async (req, res) => {
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
