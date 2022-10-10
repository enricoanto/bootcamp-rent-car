const { Op } = require("sequelize");
const {
  parsePaginationFromRequest,
  toOffsetBasedPagination,
  toPageCount,
} = require("../../../helpers/paginate");

const { Car } = require("../../../models");

class CarV2 {
  static async getCars(req, res) {
    try {
      const { name, minPrice, maxPrice, isRented } = req.query;
      const { page, pageSize } = parsePaginationFromRequest(req);
      const { limit, offset } = toOffsetBasedPagination({ page, pageSize });
      const where = {};

      if (!!name) {
        const keyword = `%${name}%`;
        where.name = {
          [Op.iLike]: keyword,
        };
      }

      if (!!minPrice || !!maxPrice) where.price = {};

      if (!!minPrice) {
        where.price = {
          [Op.gte]: Number(minPrice),
        };
      }

      if (!!maxPrice) {
        where.price = {
          [Op.lte]: Number(maxPrice),
        };
      }

      if (isRented === "true") {
        where[Op.and] = [
          { status: true },
          { finish_rent_at: { [Op.not]: null } },
          { finish_rent_at: { [Op.gt]: Date.now() } },
        ];
      }

      if (isRented === "false") {
        where[Op.and] = [
          {
            [Op.or]: [{ status: false }, { status: null }],
          },
          {
            [Op.or]: [
              { finish_rent_at: null },
              { finish_rent_at: { [Op.lt]: Date.now() } },
            ],
          },
        ];
      }

      const cars = await Car.findAll({
        where,
        limit,
        offset,
      });

      const count = await Car.count();

      const pageCount = toPageCount({ pageSize, count });

      res.status(200).json({
        page,
        pageSize,
        pageCount,
        count,
        cars,
      });
    } catch (err) {
      res.status(500).json({
        name: "Internal server error",
        message: err.message,
      });
    }
  }
}

module.exports = CarV2;
