const UserController = require('../../controllers/userController');

const router = require('express').Router();

router.post('/', UserController.login);

module.exports = router;
