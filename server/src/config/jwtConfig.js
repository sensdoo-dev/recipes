const jwtConfig = {
  access: {
    type: 'accessToken',
    expiresIn: `${1000 * 60 * 60 * 1}`,
  },
  refresh: {
    type: 'refreshToken',
    expiresIn: `${1000 * 60 * 60 * 12}`,
  },
};

module.exports = jwtConfig;
