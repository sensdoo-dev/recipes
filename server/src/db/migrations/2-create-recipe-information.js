'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RecipeInformations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      instructions: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      isFavourite: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      readyInMinutes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      summary: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      extendedIngredients: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RecipeInformations');
  },
};
