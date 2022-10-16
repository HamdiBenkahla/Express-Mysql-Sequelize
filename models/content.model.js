const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Content extends Model {}
  Content.init(
    {
      paragraph: DataTypes.STRING,
      title: DataTypes.STRING,
      quote: DataTypes.STRING,
      //columnId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Content",
    }
  );
  return Content;
};
