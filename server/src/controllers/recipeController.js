// const { instance } = require('../shared/lib/axiosInstance');
const formatResponse = require('../utils/formatResponse');
const axios = require('axios');
require('dotenv').config();

module.exports = class RecipeController {
  static async complexSearch(req, res) {
    try {
      const { query } = req.query;
      const response = await axios.get(
        `${process.env.API_RECIPES}/complexSearch?apiKey=${process.env.API_KEY}&query=${query}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      console.log(response.data);

      res.status(200).json(formatResponse(200, 'OK', response.data));
    } catch (error) {
      res
        .status(500)
        .json(formatResponse(500, 'Unxpected server error', null, error.message));
    }
  }
};
