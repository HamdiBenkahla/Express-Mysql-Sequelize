const {
    Model
  } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    class Column extends Model {};
    Column.init({
        // rowId: DataTypes.INTEGER,
    }, {
      sequelize,
      modelName: 'Column',
    });
    return Column;
  };