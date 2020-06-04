const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const globalErrorhandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const mainmenuRouter = require('./routes/mainmenuRouter');
const AppError = require('./utils/appError');
//1>MIDDLE WARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('hello from the middleware 🤝 ');
//   next();
// });
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// ROUTE HANDLER

// app.get('/api/v1/tours', getAlltours);
// app.post('/api/v1/tours', PostById);
// app.get('/api/v1/tours/:id', getById);
// app.patch('/api/v1/tours/:id', UpdateById);
// app.delete('/api/v1/tours/:id'), DeleteById;

//3 rOUTE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/mainmenu', mainmenuRouter);
// app.use('/api/v1/category', categoryRouter);
// app.use('/api/v1/contactus', contactusRouter);
// app.use('/api/v1/product', productRouter);
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'message',
  //   message: `can't find ${req.originalUrl} on this server !`,
  // });
  // const err = new Error(`can't find ${req.originalUrl} on this server !`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`can't find ${req.originalUrl} on this server !`));
});
// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
//   // err.status='fail',
//   // err.statuscode=404
// });
app.use(globalErrorhandler);
// app.get('/', (req, res) => {
//   res.status(200).send('hello from server side ');
// });

module.exports = app;
