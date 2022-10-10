"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {
        sourceKey: "id",
        foreignKey: "UserId",
      });
    }
  }
  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       properties:
   *         id:
   *           type: number
   *           format: int32
   *           example: 1
   *         email:
   *           type: string
   *           format: email
   *           example: fain@bcr.io
   *         role:
   *           type: string
   *           enum:
   *           - Admin
   *           - Customer
   */
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6],
            msg: "password must be at least 6 characters",
          },
        },
      },
      role: {
        type: DataTypes.ENUM(["Admin", "Customer"]),
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
