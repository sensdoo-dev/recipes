const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ RecipeInformation }) {
      this.hasMany(RecipeInformation, { foreignKey: 'userId' });
    }

    static async getByEmail(email) {
      const candidate = await User.findOne({ where: { email } });
      return candidate;
    }

    static async createNewUser({ firstName, lastName, email, hashPass }) {
      const candidate = await User.create({
        firstName,
        lastName,
        email,
        password: hashPass,
      });
      return candidate;
    }

    static async authenticate(email) {
      const candidate = await User.findOne({
        where: {
          email,
        },
      });
      return candidate;
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
