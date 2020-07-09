const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');
// const reviewController = require('../controllers/reviewController');

const router = express.Router();

// router.param('id', tourController.CheckID);
// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );
router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAlltours);
router.route('/tour-stats').get(tourController.getAllStat);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAlltours)
  .post(tourController.PostById);
router
  .route('/:id')
  .get(tourController.getById)
  .patch(tourController.UpdateById)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.DeleteById
  );

module.exports = router;
