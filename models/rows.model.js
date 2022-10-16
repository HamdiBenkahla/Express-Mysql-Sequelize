const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Row extends Model {}
  Row.init(
    {},
    {
      sequelize,
      modelName: "Row",
    }
  );
  return Row;
};
