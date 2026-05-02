import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter, FiStar, FiPlay, FiBookOpen, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';
import { FaNodeJs, FaReact, FaPython, FaRust, FaCloud } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { Helmet } from 'react-helmet-async';

// Mock data based on Figma design
const PROJECT_TABS = ['All Tech', 'Node.js', 'React', 'Python', 'Rust'];

const PROJECTS = [
  { id: 1, title: 'Build a Task Management API',    difficulty: 'SENIOR',    description: 'Architecture a high-performance RESTful API with complex relations, auth middleware, and rate limiting for enterprise-grade usage.', progress: 65, tech: 'Node.js', techIcon: <FaNodeJs className="text-green-600" />, actionText: 'View Project',  actionVariant: 'outline', avatars: ['https://i.pravatar.cc/150?u=1'], avatarExtra: '+4' },
  { id: 2, title: 'E-commerce Checkout Flow',        difficulty: 'JUNIOR',    description: 'Design and implement a multi-step checkout experience using React with cart state, coupon codes, and Stripe-style payment UI.', progress: 12, tech: 'React',   techIcon: <FaReact className="text-blue-500" />,   actionText: 'View Project',  actionVariant: 'outline', avatars: ['https://i.pravatar.cc/150?u=2'] },
  { id: 3, title: 'Real-time Data Dashboard',        difficulty: 'MID-LEVEL', description: 'Develop a socket-based dashboard that visualizes live crypto-market data with WebSocket feeds, charts, and alert thresholds.', progress: 0,  tech: 'Python',  techIcon: <FaPython className="text-yellow-500" />, actionText: 'Start Project', actionVariant: 'primary',  isNew: true },
  { id: 4, title: 'CLI Portfolio Manager',           difficulty: 'MID-LEVEL', description: 'Build a robust command-line tool for managing investment portfolios with live price fetching, P&L reports, and export to CSV.', progress: 100,tech: 'Rust',    techIcon: <FaRust className="text-orange-600" />,   actionText: 'Review Docs',   actionVariant: 'outline' },
  { id: 5, title: 'Microservices Orchestrator',      difficulty: 'SENIOR',    description: 'Configure a Kubernetes cluster and deploy a fleet of Node.js services with service discovery, load balancing, and health checks.', progress: 45, tech: 'DevOps',  techIcon: <FaCloud className="text-gray-500" />,    actionText: 'View Project',  actionVariant: 'outline' },
  { id: 6, title: 'AI Code Review Assistant',        difficulty: 'SENIOR',    description: 'Integrate OpenAI APIs to build a GitHub bot that reviews PRs, suggests improvements, and enforces coding standards automatically.', progress: 20, tech: 'Python',  techIcon: <FaPython className="text-yellow-500" />, actionText: 'Start Project', actionVariant: 'primary',  isNew: true },
  { id: 7, title: 'Authentication Microservice',     difficulty: 'MID-LEVEL', description: 'Build a standalone JWT-based auth service with refresh tokens, role-based access control, and secure session management.', progress: 80, tech: 'Node.js', techIcon: <FaNodeJs className="text-green-600" />, actionText: 'View Project',  actionVariant: 'outline', avatars: ['https://i.pravatar.cc/150?u=5'], avatarExtra: '+2' },
  { id: 8, title: 'Component Design System',         difficulty: 'JUNIOR',    description: 'Build a reusable React component library from scratch — buttons, modals, tooltips — with Storybook docs and accessibility support.', progress: 55, tech: 'React',   techIcon: <FaReact className="text-blue-500" />,   actionText: 'View Project',  actionVariant: 'outline' },
  { id: 9, title: 'Serverless Image Pipeline',       difficulty: 'MID-LEVEL', description: 'Design an AWS Lambda-powered pipeline that resizes, compresses, and CDN-delivers images on upload with zero server maintenance.', progress: 0,  tech: 'DevOps',  techIcon: <FaCloud className="text-gray-500" />,    actionText: 'Start Project', actionVariant: 'primary' },
  { id: 10,title: 'GraphQL API Gateway',             difficulty: 'SENIOR',    description: 'Consolidate multiple REST services behind a single GraphQL gateway with schema stitching, query batching, and caching layers.', progress: 30, tech: 'Node.js', techIcon: <FaNodeJs className="text-green-600" />, actionText: 'View Project',  actionVariant: 'outline', avatars: ['https://i.pravatar.cc/150?u=8'], avatarExtra: '+1' },
];

const TOP_CONTRIBUTORS = [
  { name: 'Elena Soroka',  projects: 19, avatar: 'https://i.pravatar.cc/150?u=21', badge: '🥇' },
  { name: 'Marcus Chen',   projects: 14, avatar: 'https://i.pravatar.cc/150?u=20', badge: '🥈' },
  { name: 'Riya Sharma',   projects: 11, avatar: 'https://i.pravatar.cc/150?u=33', badge: '🥉' },
  { name: 'Aiden Cole',    projects: 9,  avatar: 'https://i.pravatar.cc/150?u=34', badge: ''   },
  { name: 'Priya Nair',    projects: 8,  avatar: 'https://i.pravatar.cc/150?u=35', badge: ''   },
];

export const ProjectsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Tech');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');

  const handleActionClick = (id) => {
    navigate(`/projects/${id}`);
  };

  const filteredProjects = PROJECTS.filter(project => {
    const matchTech = activeTab === 'All Tech' || project.tech.toLowerCase().includes(activeTab.toLowerCase()) || project.tech === 'DevOps'; // including DevOps when filtering logic applies or simply match string. Actually simpler:
    const matchTechTab = activeTab === 'All Tech' || project.tech.toLowerCase() === activeTab.toLowerCase() || (activeTab === 'Node.js' && project.tech === 'Node.js');
    const matchDiff = difficultyFilter === 'ALL' || project.difficulty === difficultyFilter;
    
    // For DevOps (just checking 'All Tech' works for now, or you could map DevOps to All Tech)
    if(activeTab !== 'All Tech' && project.tech === 'DevOps') return false;

    return matchTechTab && matchDiff;
  });

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'JUNIOR': return 'bg-blue-100 text-blue-700';
      case 'MID-LEVEL': return 'bg-indigo-100 text-indigo-700';
      case 'SENIOR': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <Helmet>
        <title>Engineering Projects | CodeShastra</title>
        <meta name="description" content="Build real-world engineering projects with peer-review and industry specs." />
      </Helmet>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Engineering Projects
          </h1>
          <p className="text-lg text-gray-600">
            Refine your craft by building real-world systems. Every project in the Atelier is peer-reviewed and industry-aligned.
          </p>
        </div>
        <div className="flex gap-6 mt-4 md:mt-0 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-xl">12</span>
            <span className="text-gray-500 tracking-wider text-xs">ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-bold text-xl">48</span>
            <span className="text-gray-500 tracking-wider text-xs">COMPLETED</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Projects', value: '60+',  color: 'text-primary',    bg: 'bg-indigo-50'  },
          { label: 'Active',         value: '12',   color: 'text-green-600',  bg: 'bg-green-50'   },
          { label: 'Completed',      value: '48',   color: 'text-gray-900',   bg: 'bg-gray-50'    },
          { label: 'Contributors',   value: '340+', color: 'text-purple-600', bg: 'bg-purple-50'  },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-gray-100 flex items-center gap-3`}>
            <div>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 mb-8 pb-4">
        <div 
          className="flex gap-6 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECT_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-4 -mb-5 px-1 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4 sm:mt-0 flex items-center text-sm font-semibold text-gray-600">
          <FiFilter className="mr-2" />
          <select 
            value={difficultyFilter} 
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-transparent border-none outline-none focus:ring-0 text-sm font-semibold text-gray-600 hover:text-gray-900 cursor-pointer uppercase appearance-none"
          >
            <option value="ALL">Sort By Difficulty</option>
            <option value="JUNIOR">Junior</option>
            <option value="MID-LEVEL">Mid-Level</option>
            <option value="SENIOR">Senior</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {isLoading ? (
          // Skeleton Loaders
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-[280px]">
              <div className="flex justify-between items-start mb-4">
                <Skeleton className="w-16 h-6 rounded" />
                <div className="flex -space-x-2">
                   <Skeleton variant="circular" className="w-6 h-6" />
                   <Skeleton variant="circular" className="w-6 h-6" />
                </div>
              </div>
              <Skeleton className="w-3/4 h-6 mb-2" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-5/6 h-4 mb-6 flex-grow" />
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <Skeleton className="w-12 h-3" />
                  <Skeleton className="w-8 h-3" />
                </div>
                <Skeleton className="w-full h-1.5" />
              </div>
              <div className="flex justify-between items-center mt-auto">
                <Skeleton className="w-20 h-5" />
                <Skeleton className="w-24 h-8" />
              </div>
            </div>
          ))
        ) : (
          filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative flex flex-col h-full ${
                project.isNew ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              {/* Badges & Avatars */}
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wider ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
                
                {project.isNew ? (
                  <FiStar className="text-primary fill-primary w-5 h-5" />
                ) : project.avatars ? (
                  <div className="flex -space-x-2">
                    {project.avatars.map((url, idx) => (
                      <img key={idx} src={url} alt="Avatar" className="w-6 h-6 rounded-full border-2 border-white" />
                    ))}
                    {project.avatarExtra && (
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                        {project.avatarExtra}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-grow">{project.description}</p>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-gray-500">Progress</span>
                  <span className={project.progress === 100 ? 'text-green-600' : 'text-primary'}>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${project.progress === 100 ? 'bg-green-500' : 'bg-primary'}`} 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer Action */}
              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  {project.techIcon}
                  {project.tech}
                </div>
                <Button 
                  variant={project.actionVariant} 
                  size="sm" 
                  onClick={() => handleActionClick(project.id)}
                  className={project.actionVariant === 'outline' ? 'bg-blue-50/50 border-blue-100 text-primary hover:bg-blue-50' : ''}
                >
                  {project.actionText}
                </Button>
              </div>
            </div>
          ))
        )}

        {/* Special Banner Card */}
        <div className="bg-gradient-to-br from-[#2D1B69] to-[#1A0B40] rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between text-white">
          <div className="relative z-10">
            <span className="text-[10px] font-bold tracking-widest text-indigo-300 mb-2 block">NEW RESOURCE</span>
            <h3 className="text-2xl font-bold leading-tight mb-4">
              Mastering System Design with the Lead Architect.
            </h3>
            <p className="text-sm text-indigo-200 mb-6">
              Join our weekly live session on scaling distributed systems for 10M+ users.
            </p>
          </div>
          <div className="relative z-10">
            <Button variant="solid" className="bg-white text-[#2D1B69] hover:bg-gray-100 w-auto px-6 font-bold" onClick={() => toast.success('Spot saved!')}>
              Save My Spot
            </Button>
          </div>
          {/* Abstract geometric decoration */}
          <div className="absolute right-[-20%] bottom-[-10%] w-64 h-64 border-4 border-indigo-500/20 rounded-full blur-sm opacity-50 pointer-events-none"></div>
          <div className="absolute right-4 top-4 opacity-10">
            <FiPlay size={120} />
          </div>
        </div>
      </div>

      {/* Community Contributors */}
      <div className="mt-12 mb-10 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Top Contributors This Month</h2>
            <p className="text-sm text-gray-500">Engineers leading the Atelier by project completions.</p>
          </div>
        </div>
        <div className="space-y-3">
          {TOP_CONTRIBUTORS.map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-base w-6 text-center">{c.badge || <span className="text-sm font-bold text-gray-400">#{i + 1}</span>}</span>
              <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full" />
              <p className="flex-1 text-sm font-bold text-gray-900">{c.name}</p>
              <span className="text-sm font-bold text-primary">{c.projects} projects</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Why Build Here */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 rounded-3xl p-8 border border-gray-200">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 group">
          <img 
            src="/images/debugging_workshop_banner.png" 
            alt="Desk Setup" 
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl flex items-center gap-4 text-white border border-gray-700">
             <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-300">
               <FiStar className="w-5 h-5 fill-indigo-300" />
             </div>
             <div>
               <span className="text-[10px] font-bold tracking-wider text-indigo-300 block mb-0.5">ATELIER EXCLUSIVE</span>
               <span className="font-bold text-sm">Next-Gen Debugging Workshop</span>
             </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why build here?</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">
                <FiCheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Verified Industry Spec</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our projects use the same PR requirements and CI/CD pipelines as top-tier engineering firms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">
                <FiMessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Direct Mentor Feedback</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Don't just code. Get line-by-line feedback from engineers who have built the systems you use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
