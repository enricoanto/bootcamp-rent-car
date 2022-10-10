const {
  parsePaginationFromRequest,
  toOffsetBasedPagination,
  toPageCount,
} = require("../../../helpers/paginate");

const { Order, User, Car } = require("../../../models");

class OrderV2 {
  static async getOrders(req, res) {
    try {
      const { page, pageSize } = parsePaginationFromRequest(req);
      const { limit, offset } = toOffsetBasedPagination({ page, pageSize });

      const orders = await Order.findAll(
        {
          where: {
            UserId: req.client.id,
          },
          limit,
          offset,
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

      const count = await Order.count({
        where: {
          UserId: req.client.id,
        },
      });

      const pageCount = toPageCount({ pageSize, count });

      res.status(200).json({
        page,
        pageSize,
        pageCount,
        count,
        orders,
      });
    } catch (err) {
      res.status(500).json({
        name: "Internal server error",
        message: err.message,
      });
    }
  }
}

module.exports = OrderV2;
