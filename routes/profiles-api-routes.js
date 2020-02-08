var db = require("../models");

module.exports = function (app) {

    // Gets the profile
    app.get("/api/profiles/:username", function (req, res) {
        db.Profile.findOne({
            where: {
                username: req.params.username
            },
            include:[db.Stock]
        }).then(function (dbProfile) {
            res.json(dbProfile);
        });
    });

    // Create new profile
    app.post("/api/profiles", function(req, res) {
        db.Profile.create(req.body).then(function(dbProfile) {
          res.json(dbProfile);
        });
      });

    // Delete the profile
    app.delete("/api/profiles/:username", function(req, res) {
    db.Profile.destroy({ where: { id: req.params.username } }).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });
};