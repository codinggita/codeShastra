import api from './api';

const runCode = async (sourceCode, language) => {
  const response = await api.post('/submissions/run', { sourceCode, language });
  return response.data;
};

const submitCode = async (challengeId, sourceCode, language) => {
  const response = await api.post('/submissions/submit', { challengeId, sourceCode, language });
  return response.data;
};

const submissionService = {
  runCode,
  submitCode,
};

export default submissionService;
