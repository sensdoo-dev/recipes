const router = require('express').Router();
const authRouter = require('./auth/auth.routes');
const apiRouter = require('./api/apiRouter.routes');

router.use('/auth', authRouter);
router.use('/api', apiRouter);

module.exports = router;
