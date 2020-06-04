const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
  f_name: {
    type: String,
    required: [true, 'first name must require '],
  },
  m_name: {
    type: String,
    required: [true, 'm_name name must require '],
  },
  l_name: {
    type: String,
    required: [true, 'l_name name must require '],
  },
  email: {
    type: String,
    required: [true, 'email name must require '],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'first name must require '],
    unique: true,
  },
  created_at: {
    type: String,
  },
});
const Contact = mongoose.model('Contact', contactSchema);
moduel.exports = Contact;
