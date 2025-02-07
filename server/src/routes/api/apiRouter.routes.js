const router = require('express').Router();
const recipesRouter = require('./recipes.routes');

router.use('/', recipesRouter);

module.exports = router;
