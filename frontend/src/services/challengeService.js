import api from './api';

const getChallenges = async () => {
  const response = await api.get('/challenges');
  return response.data;
};

const challengeService = {
  getChallenges,
};

export default challengeService;
