const slugify = require("slugify");
const { Order, Car, User } = require("../../models");
const firebase = require("../../helpers/firebase");

class OrderController {
  static async addOrder(req, res) {
    try {
      const { start_rent_at, finish_rent_at, car_id } = req.body;
      const total_day =
        (new Date(finish_rent_at) - new Date(start_rent_at)) / 86400000;
      const car = await Car.findByPk(car_id);

      if (!car) {
        return res.status(404).json({
          name: "Not Found",
          message: `Car with id = ${car_id} is not Found`,
        });
      }

      const total_price = (total_day + 1) * car.price;
      const newOrder = await Order.create({
        start_rent_at,
        status: false,
        finish_rent_at,
        UserId: req.client.id,
        CarId: car.id,
        total_price,
      });

      res.status(201).json(newOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async uploadSlipOrder(req, res) {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
          name: "Bad Request",
          message: "Slip is required",
        });
      }

      const order = await Order.findOne({
        where: {
          id: req.params.id,
          UserId: req.client.id,
        },
      });

      if (!order) {
        return res.status(404).json({
          name: "Not found",
          message: `Order with id = ${req.params.id} not found!`,
        });
      }

      let image = req.files.slip;
      let imageName = slugify(`${Number(new Date())}-${image.name}`);
      let imageUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.UPLOADURL}/o/orders%2F${imageName}?alt=media`;

      await firebase
        .file(`orders/${imageName}`)
        .createWriteStream()
        .end(req.files.slip.data);

      order.slip = imageUrl;
      await order.save();

      return res.status(200).json(order);
    } catch (err) {
      res.status(500).json({
        name: "Internal server error",
        message: err.message,
      });
    }
  }

  static async getOrders(req, res) {
    try {
      const orders = await Order.findAll(
        {
          where: {
            UserId: req.client.id,
          },
        },
        {
          include: [
            {
              model: User,
              attributes: {
                exclude: ["id", "password", "createdAt", "updatedAt"],
              },
            },
            {
              model: Car,
              attributes: {
                exclude: ["id", "createdAt", "updatedAt"],
              },
            },
          ],
        }
      );
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getOrderById(req, res) {
    try {
      const id = req.params.id;
      const order = await Order.findByPk(id, {
        include: [
          {
            model: User,
            attributes: {
              exclude: ["id", "password", "createdAt", "updatedAt"],
            },
          },
          {
            model: Car,
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateOrder(req, res) {
    try {
      const id = req.params.id;
      const { start_rent_at, finish_rent_at, car_id } = req.body;
      const total_day =
        (new Date(finish_rent_at) - new Date(start_rent_at)) / 86400000;
      const car = await Car.findByPk(car_id);

      const total_price = (total_day + 1) * car.price;
      const updateOrder = await Order.update(
        {
          start_rent_at,
          finish_rent_at,
          UserId: req.client.id,
          CarId: car.id,
          total_price,
        },
        {
          where: {
            id,
          },
          returning: 1,
        }
      );
      res.status(200).json(updateOrder[1][0]);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteOrder(req, res) {
    try {
      const id = req.params.id;
      const data = await Order.destroy({
        where: {
          id,
        },
      });
      if (data) {
        res.status(200).json({
          name: "Delete Success",
          message: `Order with id = ${id} has been delete`,
        });
      } else {
        res.status(400).json({
          name: "Not Found",
          message: `Order with id = ${id} is not Found`,
        });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = OrderController;
