'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeInformation extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  RecipeInformation.init(
    {
      recipeId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      instructions: DataTypes.STRING(1000),
      isFavourite: DataTypes.BOOLEAN,
      readyInMinutes: DataTypes.INTEGER,
      summary: DataTypes.STRING(1000),
      extendedIngredients: DataTypes.STRING(1000),
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'RecipeInformation',
    },
  );
  return RecipeInformation;
};
