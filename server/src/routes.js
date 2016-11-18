// server/src/routes.js

var path = require('path');
var request = require('request');

// Models
var Contact = require('./models/contact');

module.exports = function(app) {
  // Back-end routes
  // GET routes
  app.get('/api/contacts', function(req, res) {
    Contact.find(function(err, contacts) {
      if (err)
        res.send(err);

      res.json({ message: "", data: contacts });
    });
  });

  app.get('/api/contacts/:contact_id', function(req, res) {
    Contact.findById(req.params.contact_id, function(err, contact) {
      if (err)
        res.send(err);

      res.json({ data: contact });
    });
  });
  
  // POST routes
  app.post('/api/contacts/:contact_id', function(req, res) {
    var contact = new Contact();
    contact.firstName = req.body.firstName;
    contact.lastName = req.body.lastName;
    contact.email = req.body.lastName;
    contact.lastName = req.body.lastName;

    contact.save(function(err) {
      if (err)
        res.send(err);
      
      res.json({ message: 'Contact created/updated!', data: contact });
    });
  });

  app.post('/auth/instagram/', function(req, res) {
    var code = req.body.code;

    var formData = {
      'client_id': req.body.clientId,
      'client_secret': '53e485fb931743b7be4d871ba6ec7a19',
      'grant_type': 'authorization_code',
      'redirect_uri': req.body.redirectUri,
      'code': req.body.code
    };

    request.post({url: 'https://api.instagram.com/oauth/access_token', formData: formData}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      } else {
        res.json({error: error});
      }
    })
  });

  // PUT routes
  // app.put('/api/todos/:todo_id', function(req, res) {
  //   Todo.findById(req.params.todo_id, function(err, todo) {
  //     if (err)
  //       res.send(err);

  //     todo.description = req.body.description;
  //     todo.done = req.body.done;

  //     // Save the todo
  //     todo.save(function(err) {
  //       if (err)
  //         res.send(err);

  //       res.json({ message: 'Todo updated!', data: todo });
  //     })
  //   });
  // });

  // DELETE routes
  // app.delete('/api/todos/:todo_id', function(req, res) {
  //   Todo.remove({
  //     _id: req.params.todo_id
  //   }, function(err, todo) {
  //     if (err)
  //       res.send(err);
        
  //     res.json({ message: 'Successfully deleted!', data: todo });
  //   });
  // });

  // Front-end routes
  // Load the index page
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('./client/www/index.html'));
  });
}