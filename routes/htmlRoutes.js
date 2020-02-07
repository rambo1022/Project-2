var db = require("../models");

module.exports = function(app) {
  // Load index page aka login page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Load register page
  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });

  // Load profile page and pass in a profile by username
  app.get("/profile/:username", function(req, res) {
    db.Stock.findOne({ where: { id: req.params.id } }).then(function(dbProfile) {
      res.render("profile", {
        profiles: dbProfile
      });
    });
  });

  // Load stock page and pass in a stock by id
  app.get("/stock/:id", function(req, res) {
    db.Stock.findOne({ where: { id: req.params.id } }).then(function(dbStock) {
      res.render("search", {
        stocks: dbStock
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
