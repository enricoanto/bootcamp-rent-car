const {
  parsePaginationFromRequest,
  toOffsetBasedPagination,
  toPageCount,
} = require("../../../helpers/paginate");
const { parseSortFromRequest } = require("../../../helpers/sort");

const { Order, User, Car } = require("../../../models");

const ALLOWED_SORTS = {
  user_email: [
    {
      model: User,
    },
    "email",
  ],
  car_name: [
    {
      model: Car,
    },
    "name",
  ],
  category: "category",
  price: "price",
  created_at: "createdAt",
  updated_at: "updatedAt",
  start_rent_at: "start_rent_at",
  finish_rent_at: "finish_rent_at",
};

class OrderV2 {
  static async getOrders(req, res) {
    try {
      const sort = parseSortFromRequest(req, ALLOWED_SORTS);
      const { page, pageSize } = parsePaginationFromRequest(req);
      const { limit, offset } = toOffsetBasedPagination({ page, pageSize });
      const queryArgs = {
        limit,
        offset,
      };

      if (!!sort) {
        const sortArgs = [];

        Array.isArray(sort.column)
          ? sortArgs.push(...sort.column)
          : sortArgs.push(sort.column);

        sortArgs.push(sort.direction);

        queryArgs.order = [sortArgs];
      }

      const orders = await Order.findAll({
        ...queryArgs,
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

      const count = await Order.count();

      const pageCount = toPageCount({ pageSize, count });

      res.status(200).json({
        page,
        pageSize,
        pageCount,
        count,
        orders,
      });
    } catch (err) {
      console.error(err.stack);
      res.status(500).json({
        name: "Internal server error",
        message: err.message,
      });
    }
  }
}

module.exports = OrderV2;
