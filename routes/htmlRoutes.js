var db = require("../models");

module.exports = function(app) {
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
};
