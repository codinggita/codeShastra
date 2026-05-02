const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./src/models/Project');

dotenv.config();

const PROJECTS = [
  { title: 'Build a Task Management API',    difficulty: 'SENIOR',    description: 'Architecture a high-performance RESTful API with complex relations, auth middleware, and rate limiting for enterprise-grade usage.', progress: 65, tech: 'Node.js', actionText: 'View Project',  actionVariant: 'outline', avatars: ['https://i.pravatar.cc/150?u=1'], avatarExtra: '+4' },
  { title: 'E-commerce Checkout Flow',        difficulty: 'JUNIOR',    description: 'Design and implement a multi-step checkout experience using React with cart state, coupon codes, and Stripe-style payment UI.', progress: 12, tech: 'React', actionText: 'View Project',  actionVariant: 'outline', avatars: ['https://i.pravatar.cc/150?u=2'] },
  { title: 'Real-time Data Dashboard',        difficulty: 'MID-LEVEL', description: 'Develop a socket-based dashboard that visualizes live crypto-market data with WebSocket feeds, charts, and alert thresholds.', progress: 0,  tech: 'Python', actionText: 'Start Project', actionVariant: 'primary',  isNewProject: true },
  { title: 'CLI Portfolio Manager',           difficulty: 'MID-LEVEL', description: 'Build a robust command-line tool for managing investment portfolios with live price fetching, P&L reports, and export to CSV.', progress: 100,tech: 'Rust', actionText: 'Review Docs',   actionVariant: 'outline' },
  { title: 'Microservices Orchestrator',      difficulty: 'SENIOR',    description: 'Configure a Kubernetes cluster and deploy a fleet of Node.js services with service discovery, load balancing, and health checks.', progress: 45, tech: 'DevOps', actionText: 'View Project',  actionVariant: 'outline' },
  { title: 'AI Code Review Assistant',        difficulty: 'SENIOR',    description: 'Integrate OpenAI APIs to build a GitHub bot that reviews PRs, suggests improvements, and enforces coding standards automatically.', progress: 20, tech: 'Python', actionText: 'Start Project', actionVariant: 'primary',  isNewProject: true },
  { title: 'Authentication Microservice',     difficulty: 'MID-LEVEL', description: 'Build a standalone JWT-based auth service with refresh tokens, role-based access control, and secure session management.', progress: 80, tech: 'Node.js', actionText: 'View Project',  actionVariant: 'outline', avatars: ['https://i.pravatar.cc/150?u=5'], avatarExtra: '+2' },
  { title: 'Component Design System',         difficulty: 'JUNIOR',    description: 'Build a reusable React component library from scratch — buttons, modals, tooltips — with Storybook docs and accessibility support.', progress: 55, tech: 'React', actionText: 'View Project',  actionVariant: 'outline' },
  { title: 'Serverless Image Pipeline',       difficulty: 'MID-LEVEL', description: 'Design an AWS Lambda-powered pipeline that resizes, compresses, and CDN-delivers images on upload with zero server maintenance.', progress: 0,  tech: 'DevOps', actionText: 'Start Project', actionVariant: 'primary' },
  { title: 'GraphQL API Gateway',             difficulty: 'SENIOR',    description: 'Consolidate multiple REST services behind a single GraphQL gateway with schema stitching, query batching, and caching layers.', progress: 30, tech: 'Node.js', actionText: 'View Project',  actionVariant: 'outline', avatars: ['https://i.pravatar.cc/150?u=8'], avatarExtra: '+1' },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    await Project.deleteMany(); // Clear existing projects
    console.log('Cleared existing projects.');

    await Project.insertMany(PROJECTS);
    console.log('Projects imported successfully!');

    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

seedData();
