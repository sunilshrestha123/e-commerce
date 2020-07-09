const express = require('express ');
const subcategoryController = require('./../controllers/subcategoryController');
const router = express.Router();
router
  .route('/')
  .get(subcategoryController.getAll)
  .post(subcategoryController.createSubcategory);
router
  .route('/:id')
  .patch(subcategoryController.updateSubcategory)
  .delete(subcategoryController.deleteSubcategory);
module.exports = router;
