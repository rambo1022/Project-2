module.exports = function(sequelize, DataTypes) {
  var Stocks = sequelize.define("Stocks", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  return Stocks;
};
