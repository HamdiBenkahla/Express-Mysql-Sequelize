const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Image extends Model {};
    Image.init({
        path : DataTypes.STRING,
        page_id : DataTypes.INTEGER,
        contentId : DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Image',
    });
    return Image;
  };