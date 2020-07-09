const express = require('express');
const slideController = require('./../controllers/slideContoller');
const router = express.Router();
router
  .route('/')
  .get(slideController.getAllSlide)
  .post(
    slideController.uploadSlide,
    slideController.resizeUserPhoto,
    slideController.createSlide
  );
router
  .route('/:id')
  .get(slideController.getSlide)
  .patch(slideController.updateSlide)
  .delete(slideController.deleteSlide);
module.exports = router;
