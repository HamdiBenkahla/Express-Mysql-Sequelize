const {
    Model
  } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    class Row extends Model {};
    Row.init({
      // pageId: DataTypes.INTEGER,
    }, {
      sequelize,
      modelName: 'Row',
    });
    return Row;
  };