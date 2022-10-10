const e = require("express");
const { QueryTypes } = require("sequelize");
const { Car, Order, User, sequelize } = require("../../models");

const REPORT_PER_MONTH_QUERY = `
SELECT TO_CHAR(day, 'YYYY-MM-DD') AS day,
      (SELECT COUNT(*) FROM "Orders"
        WHERE start_rent_at = day::date
        AND status IS TRUE) AS "orderCount"
FROM generate_series(date :from, :until, '1 day') AS day
`;

class OrderController {
  static async getOrders(req, res) {
    try {
      const orders = await Order.findAll({
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

  static async changeStatus(req, res) {
    try {
      const id = req.params.id;
      const status = Number(req.body.status);
      const order = await Order.update(
        {
          status: true,
        },
        {
          where: {
            id,
          },
          returning: 1,
        }
      );
      if (order[1] === 0) {
        return res.status(404).json({
          name: "Not Found",
          message: `Order with id = ${id} is not Found`,
        });
      } else {
        if (status == 1) {
          await Car.update(
            {
              start_rent_at: order[1][0].start_rent_at,
              finish_rent_at: order[1][0].finish_rent_at,
              status: true,
            },
            {
              where: {
                id: order[1][0].CarId,
              },
            }
          );
          res
            .status(200)
            .json({ name: "Success", message: `Car start to rent` });
        } else {
          await Car.update(
            {
              start_rent_at: null,
              finish_rent_at: null,
              status: false,
            },
            {
              where: {
                id: order[1][0].CarId,
              },
            }
          );
          res
            .status(200)
            .json({ name: "Success", message: "Finish rent car." });
        }
      }
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
        res.status(404).json({
          name: "Not Found",
          message: `Order with id = ${id} is not Found`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getReportPerMonth(req, res) {
    try {
      const reports = await sequelize.query(REPORT_PER_MONTH_QUERY, {
        replacements: {
          from: req.query.from,
          until: req.query.until,
        },
        type: QueryTypes.SELECT,
      });

      res.status(200).json(
        reports.map((report) => ({
          day: report.day,
          orderCount: Number(report.orderCount),
        }))
      );
    } catch (err) {
      res.status(500).json({
        name: "Internal server error",
        message: err.message,
      });
    }
  }
}

module.exports = OrderController;
