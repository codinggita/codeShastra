import api from './api';

const projectService = {
  // Get all projects
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
};

export default projectService;
