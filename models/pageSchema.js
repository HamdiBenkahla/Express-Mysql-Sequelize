const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Page extends Model {};
    Page.init({}, {
      sequelize,
      modelName: 'Page',
    });
    return Page;
  };