const router = require('express').Router();
const RecipeController = require('../../controllers/recipeController');

router.get('/complexSearch', RecipeController.complexSearch);

module.exports = router;
