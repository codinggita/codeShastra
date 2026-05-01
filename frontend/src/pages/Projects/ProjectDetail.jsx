import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiGithub, FiPlay, FiCheckCircle } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch the project details from an API based on the ID.
  // We mock it here for demonstration.
  const projectInfo = {
    title: `Project Overview #${id}`,
    description: "Welcome to the interactive project dashboard. Here you can read the specifications, review the codebase, and submit your PRs for review.",
    status: 'In Progress',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    tasks: [
      { name: 'Setup Repository', done: true },
      { name: 'Initialize Database Schema', done: true },
      { name: 'Build Core API Endpoints', done: false },
      { name: 'Frontend Integration', done: false }
    ]
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm font-semibold text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <FiArrowLeft className="mr-2" /> Back to Projects
      </button>

      <Card padding="lg" className="mb-8 border-t-4 border-t-primary">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{projectInfo.title}</h1>
            <p className="text-gray-600">{projectInfo.description}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
            {projectInfo.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {projectInfo.techStack.map(tech => (
            <span key={tech} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card padding="md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Project Tasks</h3>
            <div className="space-y-3">
              {projectInfo.tasks.map((task, idx) => (
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
          <Card padding="md" className="bg-gray-50 border-dashed border-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Button fullWidth variant="primary" leftIcon={<FiPlay />}>
                Start Coding Environment
              </Button>
              <Button fullWidth variant="outline" leftIcon={<FiGithub />}>
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
