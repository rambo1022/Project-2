var db = require("../models");

module.exports = function(app) {
  // Get all stocks
  app.get("/api/stocks", function(req, res) {
    db.Stock.findAll({}).then(function(dbStock) {
      res.json(dbStock);
    });
  });

  // Add a new stock to the list
  app.post("/api/stocks", function(req, res) {
    db.Stock.create(req.body).then(function(dbStoc) {
      res.json(dbStock);
    });
  });

  // Delete an stock from the list
  app.delete("/api/stocks/:id", function(req, res) {
    db.Stock.destroy({ where: { id: req.params.id } }).then(function(dbStock) {
      res.json(dbStock);
    });
  });
};
