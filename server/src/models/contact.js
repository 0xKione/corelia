// server/src/models/contact.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, default: '' },
  phoneNumber: { type: String, default: '' }
}, {
  collection: 'contacts'
});

module.exports = mongoose.model('Contact', ContactSchema);