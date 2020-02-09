// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Load index page
  app.get("/home", function(req, res) {
    res.render("index", {
      title: "Home Page"
    });
  });

  // Load tracker page
  app.get("/tracker", function(req, res) {
    res.render("tracker", {
      title: "Tracker"
    });
  });

  // Load heat map page
  app.get("/heatmap", function(req, res) {
    res.render("heatMap", {
      title: "Heat Map"
    });
  });

  // Load contact us page
  app.get("/contactus", function(req, res) {
    res.render("contactUs", {
      title: "Contact Us"
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });  

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
