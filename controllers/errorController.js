const AppError = require('./../utils/appError');

const handleCastErrorDB = () => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};
const handleJWTError = () =>
  new AppError('Invalid token .please log in again', 401);
const handleJWTExpiredError = (erro) =>
  new AppError('yout token has expired! please login in again ', 401);
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorPro = (err, res) => {
  //opertiona error  trusted error:send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    //programming or other error
  } else {
    console.log('Error 🔥 ', err);
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorPro(error, res);

    // res.status(err.statusCode).json({
    //   status: err.status,
    //   message: err.message,
    // });
  }
};
// res.status(err.statusCode).json({
//   status: err.status,
//   message: err.message,
// });
// err.status='fail',
// err.statuscode=404
// };
