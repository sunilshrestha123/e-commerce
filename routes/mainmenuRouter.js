const express = require('express');
const mainmenuController = require('./../controllers/mainmenuController');
const router = express.Router();

router
  .route('/')
  .get(mainmenuController.getAllMainMenu)
  .post(mainmenuController.CreateMainMenu);
router
  .route('/:id')
  .get(mainmenuController.getMainMenu)
  .get(mainmenuController.UpdateMainMenu)
  .patch(mainmenuController.DeleteMainMenu);
module.exports = router;
