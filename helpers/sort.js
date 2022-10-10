const parseSortFromRequest = (req, allowedSortMap = {}) => {
  let { sort } = req.query;
  if (!sort) return null;
  sort = sort.replace(/\s/g, "");
  const [col, direction] = sort.split(":");

  const column = allowedSortMap[col];

  if (!column) return null;

  return { column, direction };
};

module.exports = {
  parseSortFromRequest,
};
