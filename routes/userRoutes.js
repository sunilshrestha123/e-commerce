const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.CreateUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.UpdateUser)
  .delete(userController.DeleteUser);

module.exports = router;
