const formatResponse = require('../utils/formatResponse');
const bcrypt = require('bcrypt');
const { generateTokens } = require('../utils/generateTokens');
const jwtConfig = require('../config/jwtConfig');
const { User } = require('../db/models');

module.exports = class UserController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json(formatResponse(400, 'Нужно заполнить все поля'));
      }

      const candidate = await User.authenticate(email);

      if (!candidate) {
        return res
          .status(400)
          .json(formatResponse(400, 'Неверное имя пользователя или пароль'));
      }

      const user = candidate.get({ plain: true });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json(formatResponse(400, 'Неверное имя пользователя или пароль'));
      }

      const { accessToken, refreshToken } = generateTokens(user);

      res
        .status(200)
        .cookie(jwtConfig.refresh.type, refreshToken, {
          maxAge: jwtConfig.refresh.expiresIn,
          httpOnly: true,
        })
        .json(formatResponse(200, 'login success', { accessToken, user }));
    } catch (error) {
      res
        .status(500)
        .json(formatResponse(500, 'Unxpected server error', null, error.message));
    }
  }

  static async logout(req, res) {
    try {
      res
        .clearCookie(jwtConfig.refresh.type)
        .json(formatResponse('200', 'logout success'));
    } catch (error) {
      res.json(formatResponse('500', 'Server error', null, error.message));
    }
  }

  static async reg(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json(formatResponse(400, 'Нужно заполнить все поля'));
      }

      const isCandidateExist = await User.getByEmail(email);

      if (isCandidateExist) {
        return res.status(400).json(formatResponse(400, 'Пользоваель уже существует'));
      }

      const hashPass = await bcrypt.hash(password, 10);

      const candidate = await User.createNewUser({
        firstName,
        lastName,
        email,
        hashPass,
      });

      const user = candidate.get({ plain: true });

      delete user.password;

      const { accessToken, refreshToken } = generateTokens(user);

      res
        .status(201)
        .cookie(jwtConfig.refresh.type, refreshToken, {
          maxAge: jwtConfig.refresh.expiresIn,
          httpOnly: true,
        })
        .json(formatResponse(201, 'UserCreated', { accessToken, user }));
    } catch (error) {
      res.status(500).json(formatResponse(200, 'Unxpected server error', null, error));
    }
  }

  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;

      const { accessToken, refreshToken } = generateTokens(user);

      res
        .cookie(jwtConfig.refresh.type, refreshToken, {
          maxAge: jwtConfig.refresh.expiresIn,
          httpOnly: true,
        })
        .json(
          formatResponse(200, 'Refresh tokens success', {
            user,
            accessToken,
          }),
        );
    } catch (error) {
      res.json(formatResponse(500, null, null, error.message));
    }
  }
};
