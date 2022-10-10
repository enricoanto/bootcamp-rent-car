"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
      Order.belongsTo(models.Car);
      Order.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "UserId",
      });
    }
  }
  /**
   * @swagger
   * components:
   *   schemas:
   *     Order:
   *       type: object
   *       properties:
   *         id:
   *           type: number
   *           format: int32
   *           example: 1
   *         total_price:
   *           type: number
   *           format: int32
   *           example: 100000
   *         start_rent_at:
   *           type: string
   *           format: date
   *           example: 2022-01-01
   *         finish_rent_at:
   *           type: string
   *           format: date
   *           example: 2022-01-02
   *         status:
   *           type: boolean
   *           example: false
   *         slip:
   *           type: string
   *           format: uri
   *           example: https://www.jurnal.id/wp-content/uploads/2021/09/contoh-nota-kosong-434x628.png
   *         UserId:
   *           type: number
   *           format: int32
   *           example: 1
   *         CarId:
   *           type: number
   *           format: int32
   *           example: 1
   */
  Order.init(
    {
      total_price: DataTypes.INTEGER,
      start_rent_at: DataTypes.DATE,
      finish_rent_at: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      slip: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      CarId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (order, options) => {
          order.code = new Date().toString();
        },
      },
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
