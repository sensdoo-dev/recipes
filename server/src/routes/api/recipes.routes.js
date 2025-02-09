const router = require('express').Router();
const RecipeController = require('../../controllers/recipeController');

router.get('/complexSearch', RecipeController.complexSearch);
router.get('/recipeInformation/:recipeId', RecipeController.getRecipeInformationById);

module.exports = router;
