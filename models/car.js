"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.hasMany(models.Order, {
        sourceKey: "id",
        foreignKey: "CarId",
      });
    }
  }
  /**
   * @swagger
   * components:
   *   schemas:
   *     Car:
   *       type: object
   *       properties:
   *         id:
   *           type: number
   *           format: int32
   *           example: 1
   *         name:
   *           type: string
   *           example: Toyota Avanza
   *         category:
   *           type: string
   *           enum:
   *           - small
   *           - medium
   *           - large
   *           example: medium
   *         price:
   *           type: number
   *           format: int32
   *           example: 100000
   *         status:
   *           type: boolean
   *           example: false
   *         start_rent_at:
   *           type: string
   *           format: date
   *           example: 2022-01-01
   *         finish_rent_at:
   *           type: string
   *           format: date
   *           example: 2022-01-02
   *         image:
   *           type: string
   *           format: uri
   *           example: https://upload.wikimedia.org/wikipedia/commons/0/0d/2019_Toyota_Avanza_1.3_G_F653RM_%2820200228%29.jpg
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updateAt:
   *           type: string
   *           format: date-time
   */
  Car.init(
    {
      name: DataTypes.STRING,
      category: {
        type: DataTypes.ENUM,
        values: ["small", "medium", "large"],
      },
      price: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      start_rent_at: DataTypes.DATE,
      finish_rent_at: DataTypes.DATE,
      image: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (car, options) => {
          car.status = false;
        },
      },
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
