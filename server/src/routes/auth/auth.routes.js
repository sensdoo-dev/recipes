const router = require('express').Router();
const regRouter = require('./reg.routes');
const loginRouter = require('./login.routes');
const logoutRouter = require('./logout.routes');
const refreshRouter = require('./refresh.routes');

router.use('/reg', regRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/refreshTokens', refreshRouter);
module.exports = router;
