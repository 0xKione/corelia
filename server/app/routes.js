var path = require('path');

module.exports = function(app) {
  // Back-end routes
  // GET routes
  
  // POST routes

  // PUT routes

  // DELETE routes

  // Front-end routes
  // Load the index page
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('./client/www/index.html'));
  });
}