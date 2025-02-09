const router = require('express').Router();
const RecipeController = require('../../controllers/recipeController');
const verifyAccessToken = require('../../middleware/verifyAccesToken');

router.get('/complexSearch', RecipeController.complexSearch);
router.get('/recipeInformations/:recipeId', RecipeController.getRecipeInformationById);
router.get(
  '/recipeInformations/user/:userId',
  RecipeController.getRecipeInformationByUserId,
);
router.post('/recipeInformations', verifyAccessToken, RecipeController.updateIsFavourite);
router.delete(
  '/recipeInformations/:recipeId',
  verifyAccessToken,
  RecipeController.deleteFavourite,
);

module.exports = router;
