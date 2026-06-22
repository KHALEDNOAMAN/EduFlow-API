const { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } = require('../config/constants');

const formatResponse = (data, meta = null) => {
  const response = { success: true, data };
  if (meta) response.meta = meta;
  return response;
};

const getPaginationParams = (query) => {
  let page = parseInt(query.page) || 1;
  let perPage = parseInt(query.perPage || query.limit) || DEFAULT_PAGE_SIZE;
  if (page < 1) page = 1;
  if (perPage > MAX_PAGE_SIZE) perPage = MAX_PAGE_SIZE;
  const offset = (page - 1) * perPage;
  return { page, perPage, offset };
};

const formatPaginationMeta = (page, perPage, total) => ({
  page,
  perPage,
  total,
  totalPages: Math.ceil(total / perPage),
});

module.exports = { formatResponse, getPaginationParams, formatPaginationMeta };
