require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // console.log(user);

    delete user.iat;
    delete user.exp;

    res.locals.user = user;

    next();
  } catch (error) {
    console.log('Invalid refresh token');
    res.clearCookie(jwtConfig.refresh.type).sendStatus(401);
  }
}

module.exports = verifyRefreshToken;
