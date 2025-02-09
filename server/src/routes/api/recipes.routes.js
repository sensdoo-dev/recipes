const router = require('express').Router();
const RecipeController = require('../../controllers/recipeController');
const verifyAccessToken = require('../../middleware/verifyAccesToken');

router.get('/complexSearch', RecipeController.complexSearch);
router.get('/recipeInformations/:recipeId', RecipeController.getRecipeInformationById);
router.post('/recipeInformations', verifyAccessToken, RecipeController.updateIsFavourite);

module.exports = router;
