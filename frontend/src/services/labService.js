import api from './api';

const getLabs = async () => {
  const response = await api.get('/labs');
  return response.data;
};

const labService = {
  getLabs,
};

export default labService;
