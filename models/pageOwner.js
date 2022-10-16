const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PageOwner extends Model {}
  PageOwner.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PageOwner",
    }
  );
  return PageOwner;
};
