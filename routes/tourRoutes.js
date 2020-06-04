const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.CheckID);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAlltours);
router.route('/tour-stats').get(tourController.getAllStat);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route('/').get(tourController.getAlltours).post(tourController.PostById);
router
  .route('/:id')
  .get(tourController.getById)
  .patch(tourController.UpdateById)
  .delete(tourController.DeleteById);

module.exports = router;
