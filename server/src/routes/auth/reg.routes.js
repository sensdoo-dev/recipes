const router = require('express').Router();
const UserController = require('../../controllers/userController');

router.post('/', UserController.reg);

module.exports = router;
