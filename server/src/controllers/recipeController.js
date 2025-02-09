// const { instance } = require('../shared/lib/axiosInstance');
const formatResponse = require('../utils/formatResponse');
const axios = require('axios');
const { RecipeInformation } = require('../db/models');
const { where } = require('sequelize');
require('dotenv').config();

module.exports = class RecipeController {
  static async complexSearch(req, res) {
    try {
      const { query } = req.query;

      if (!query) {
        return res
          .status(400)
          .json(formatResponse(400, 'Не переданы аргументы запроса"'));
      }

      const response = await axios.get(
        `${process.env.API_RECIPES}/complexSearch?apiKey=${process.env.API_KEY}&query=${query}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response) {
        return res
          .status(400)
          .json(formatResponse(400, 'Ошибка получения данных из стороннего API'));
      }

      res.status(200).json(formatResponse(200, 'OK', response.data));
    } catch (error) {
      res
        .status(500)
        .json(formatResponse(500, 'Unxpected server error', null, error.message));
    }
  }

  static async getRecipeInformationById(req, res) {
    try {
      const { recipeId } = req.params;

      if (!recipeId) {
        return res.status(400).json(formatResponse(400, 'Не передан ID рецепта"'));
      }

      const response = await axios.get(
        `${process.env.API_RECIPES}/${recipeId}/information?apiKey=${process.env.API_KEY}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response) {
        return res
          .status(400)
          .json(formatResponse(400, 'Ошибка получения данных из стороннего API'));
      }

      res.status(200).json(formatResponse(200, 'OK', response.data));
    } catch (error) {
      res
        .status(500)
        .json(formatResponse(500, 'Unxpected server error', null, error.message));
    }
  }

  static async updateIsFavourite(req, res) {
    try {
      const {
        recipeId,
        image,
        title,
        instructions,
        isFavourite,
        readyInMinutes,
        summary,
        extendedIngredients,
      } = req.body;

      const { user } = res.locals;
      // console.log(user);

      if (!recipeId) {
        return res.status(400).json(formatResponse(400, 'Не передан ID рецепта"'));
      }

      const isRecipeExists = await RecipeInformation.findOne({ where: { recipeId } });

      if (!isRecipeExists && user) {
        const ingredients = JSON.stringify(extendedIngredients);
        const newRecipeInformation = await RecipeInformation.create({
          recipeId,
          image,
          title,
          instructions,
          isFavourite: true,
          readyInMinutes,
          summary,
          extendedIngredients: ingredients,
          userId: user.id,
        });

        return res
          .status(200)
          .json(formatResponse(200, 'OK', newRecipeInformation.isFavourite));
      }

      if (isFavourite !== isRecipeExists.isFavourite) {
        const updatedRecipe = await isRecipeExists.update({ isFavourite });
        // console.log(updatedRecipe.get(), '<<<<<<<<<<updated');
        return res.status(200).json(formatResponse(200, 'OK', updatedRecipe.isFavourite));
      }

      // const response = await axios.get(
      //   `${process.env.API_RECIPES}/${recipeId}/information?apiKey=${process.env.API_KEY}`,
      //   {
      //     headers: { 'Content-Type': 'application/json' },
      //   },
      // );

      // if (!response) {
      //   return res
      //     .status(400)
      //     .json(formatResponse(400, 'Ошибка получения данных из стороннего API'));
      // }

      // res.status(200).json(formatResponse(200, 'OK'));
    } catch (error) {
      res
        .status(500)
        .json(formatResponse(500, 'Unxpected server error', null, error.message));
    }
  }
};
