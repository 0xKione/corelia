// server/src/models/todo.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  description: { type: String, default: '' },
  done: { type: Boolean, default: false }
}, {
  collection: 'todo'
});

module.exports = mongoose.model('Todo', TodoSchema);