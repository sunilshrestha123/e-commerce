const express = require('express');
const contactContoller = require('../controllers/contactController');
const router = express.Router();

router
  .route('/')
  .get(contactContoller.getAllContact)
  .post(contactContoller.CreateContact);
router
  .route('/:id')
  .get(contactContoller.getContact)
  .patch(contactContoller.UpdateContact)
  .delete(contactContoller.DeleteContact);
module.exports = router;
