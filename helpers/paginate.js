const parsePaginationFromRequest = (req) => ({
  page: Number(req.query.page || "1"),
  pageSize: Number(req.query.pageSize || "10"),
});

const toPageBasedPagination = (req) => {
  const { page = 1, pageSize = 10 } = req.query;
  const limit = pageSize;
  const offset = Math.floor(pageSize * (page - 1));

  return { limit, offset };
};

const toOffsetBasedPagination = ({ page = 1, pageSize = 10 }) => {
  const limit = pageSize;
  const offset = Math.floor(pageSize * (page - 1));

  return { limit, offset };
};

const toPageCount = ({ pageSize, count }) => Math.ceil(count / pageSize);

module.exports = {
  parsePaginationFromRequest,
  toOffsetBasedPagination,
  toPageBasedPagination,
  toPageCount,
};
