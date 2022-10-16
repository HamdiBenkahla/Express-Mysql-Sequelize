const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {}
  Image.init(
    {
      path: DataTypes.STRING,
      contentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
