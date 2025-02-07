const router = require('express').Router();
const verifyRefreshToken = require('../../middleware/verifyRefreshToken.js');
const UserController = require('../../controllers/userController.js');

router.get('/', verifyRefreshToken, UserController.refreshTokens);

module.exports = router;
