import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiGithub, FiPlay, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import useFetch from '@/hooks/useFetch';
import Skeleton from '@/components/ui/Skeleton';

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the project details from our live API
  const { data: projectInfo, isLoading, error } = useFetch(`/projects/${id}`);

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <Skeleton className="w-40 h-6 mb-6" />
        <Card padding="lg" className="mb-8 border-t-4 border-t-primary">
          <Skeleton className="w-1/2 h-8 mb-4" />
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-3/4 h-4" />
        </Card>
      </div>
    );
  }

  if (error || !projectInfo) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center animate-fade-in">
        <FiAlertCircle size={48} className="mx-auto text-red-500 mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project not found</h2>
        <p className="text-gray-500 mb-6">{error || "The project you are looking for doesn't exist."}</p>
        <button onClick={() => navigate('/projects')} className="text-indigo-600 font-semibold hover:underline">
          Return to Projects
        </button>
      </div>
    );
  }

  // Fallbacks for data that might not be in the model
  const techStack = projectInfo.tech ? projectInfo.tech.split(',') : ['React', 'Node.js'];
  const status = projectInfo.progress === 100 ? 'Completed' : 'In Progress';
  const tasks = [
    { name: 'Setup Repository', done: projectInfo.progress >= 20 },
    { name: 'Initialize Database Schema', done: projectInfo.progress >= 50 },
    { name: 'Build Core API Endpoints', done: projectInfo.progress >= 80 },
    { name: 'Frontend Integration', done: projectInfo.progress === 100 }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button 
        onClick={() => navigate('/projects')} 
        className="flex items-center text-sm font-semibold text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <FiArrowLeft className="mr-2" /> Back to Projects
      </button>

      <Card padding="lg" className="mb-8 border-t-4 border-t-primary shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{projectInfo.title}</h1>
            <p className="text-gray-600 leading-relaxed max-w-3xl">{projectInfo.description}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {techStack.map(tech => (
            <span key={tech} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              {tech.trim()}
            </span>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card padding="md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Project Tasks</h3>
            <div className="space-y-3">
              {tasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FiCheckCircle className={`w-5 h-5 ${task.done ? 'text-green-500' : 'text-gray-300'}`} />
                  <span className={`text-sm font-medium ${task.done ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card padding="md" className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Button 
                fullWidth 
                variant="primary" 
                leftIcon={<FiPlay />}
                onClick={() => navigate(`/projects/${projectInfo._id}/workspace`)}
                className="py-3"
              >
                Start Coding Environment
              </Button>
              <Button 
                fullWidth 
                variant="outline" 
                leftIcon={<FiGithub />}
                onClick={() => window.open('https://github.com/codeshastra', '_blank')}
              >
                View GitHub Repository
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
