// server/src/routes.js

var path = require('path');

// Models
var Todo = require('./models/todo');

module.exports = function(app) {
  // Back-end routes
  // GET routes
  app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
      if (err)
        res.send(err);

      res.json({ message: "", data: todos });
    });
  });

  app.get('/api/todos/:todo_id', function(req, res) {
    Todo.findById(req.params.todo_id, function(err, todo) {
      if (err)
        res.send(err);

      res.json(todo);
    });
  });
  
  // POST routes
  app.post('/api/todos', function(req, res) {
    var todo = new Todo();
    todo.description = req.body.description;
    todo.done = req.body.done;

    todo.save(function(err) {
      if (err)
        res.send(err);
      
      res.json({ message: 'Todo created!', data: todo });
    });
  });

  // PUT routes
  app.put('/api/todos/:todo_id', function(req, res) {
    Todo.findById(req.params.todo_id, function(err, todo) {
      if (err)
        res.send(err);

      todo.description = req.body.description;
      todo.done = req.body.done;

      // Save the todo
      todo.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Todo updated!', data: todo });
      })
    });
  });

  // DELETE routes
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);
        
      res.json({ message: 'Successfully deleted!', data: todo });
    });
  });

  // Front-end routes
  // Load the index page
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('./client/www/index.html'));
  });
}