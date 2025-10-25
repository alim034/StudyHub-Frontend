import api from './api';

// globalSearch: calls GET /api/search with query and filters
// params: { q, type, startDate, endDate, page, limit }
export const globalSearch = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.q) query.append('q', params.q);
  if (params.type) query.append('type', params.type.join(','));
  if (params.startDate) query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);
  const url = `/search?${query.toString()}`;
  return api.get(url);
};

export default { globalSearch };
