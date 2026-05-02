const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./src/models/Project');
const Lab = require('./src/models/Lab');
const Challenge = require('./src/models/Challenge');

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

const LABS = [
  { title: 'Advanced React Patterns', description: 'Master higher-order components, render props, and custom hooks to build scalable applications.', level: 'Advanced', duration: '6 Weeks', rating: '4.9', color: 'bg-blue-50', iconColor: 'text-blue-500' },
  { title: 'Data Structures in JavaScript', description: 'A deep dive into essential data structures: arrays, linked lists, trees, graphs, and their algorithms.', level: 'Intermediate', duration: '8 Weeks', rating: '4.8', color: 'bg-indigo-50', iconColor: 'text-indigo-500' },
  { title: 'Fullstack Node.js Ecosystem', description: 'Build robust APIs using Express, MongoDB, and integrate them with modern frontend frameworks.', level: 'Intermediate', duration: '10 Weeks', rating: '4.7', color: 'bg-green-50', iconColor: 'text-green-500' },
  { title: 'Web Performance Engineering', description: 'Learn techniques to optimize Core Web Vitals, lazy loading, and asset delivery for high-speed sites.', level: 'Advanced', duration: '4 Weeks', rating: '4.9', color: 'bg-orange-50', iconColor: 'text-orange-500' },
  { title: 'Intro to Web3 & Smart Contracts', description: 'Understand blockchain fundamentals and write your first smart contracts using Solidity and Hardhat.', level: 'Beginner', duration: '6 Weeks', rating: '4.6', color: 'bg-purple-50', iconColor: 'text-purple-500' },
  { title: 'System Design Interview Prep', description: 'Architect scalable, highly available systems to ace your technical interviews at top tech companies.', level: 'Advanced', duration: '12 Weeks', rating: '5.0', color: 'bg-rose-50', iconColor: 'text-rose-500' },
  { title: 'GraphQL API Design', description: 'Design and implement robust GraphQL APIs with Apollo Server and integrate with frontend clients.', level: 'Intermediate', duration: '5 Weeks', rating: '4.8', color: 'bg-cyan-50', iconColor: 'text-cyan-500' },
  { title: 'Docker & Kubernetes Basics', description: 'Containerize your applications and orchestrate them using modern DevOps practices.', level: 'Intermediate', duration: '6 Weeks', rating: '4.7', color: 'bg-teal-50', iconColor: 'text-teal-500' },
  { title: 'TypeScript for Enterprise', description: 'Leverage strong typing to build large-scale, maintainable web applications and libraries.', level: 'Advanced', duration: '4 Weeks', rating: '4.9', color: 'bg-sky-50', iconColor: 'text-sky-500' },
  { title: 'UI/UX for Developers', description: 'Learn core design principles, typography, and color theory to build beautiful interfaces.', level: 'Beginner', duration: '3 Weeks', rating: '4.5', color: 'bg-pink-50', iconColor: 'text-pink-500' },
  { title: 'Rust for WebAssembly', description: 'Write high-performance code in Rust and compile it to WebAssembly for browser execution.', level: 'Advanced', duration: '8 Weeks', rating: '4.9', color: 'bg-red-50', iconColor: 'text-red-500' },
  { title: 'Serverless Architectures', description: 'Build auto-scaling applications using AWS Lambda, DynamoDB, and API Gateway.', level: 'Intermediate', duration: '6 Weeks', rating: '4.6', color: 'bg-yellow-50', iconColor: 'text-yellow-500' },
  { title: 'Micro-Frontends Masterclass', description: 'Break down monolithic frontends into manageable, independently deployable micro-apps.', level: 'Advanced', duration: '7 Weeks', rating: '4.8', color: 'bg-fuchsia-50', iconColor: 'text-fuchsia-500' },
  { title: 'Go Lang Web Services', description: 'Build incredibly fast and concurrent web services and REST APIs using Go.', level: 'Intermediate', duration: '8 Weeks', rating: '4.7', color: 'bg-emerald-50', iconColor: 'text-emerald-500' },
  { title: 'Advanced CSS Animations', description: 'Create stunning, hardware-accelerated UI animations using plain CSS and Framer Motion.', level: 'Intermediate', duration: '4 Weeks', rating: '4.9', color: 'bg-violet-50', iconColor: 'text-violet-500' },
  { title: 'Testing Strategy & CI/CD', description: 'Implement unit, integration, and e2e tests with Jest/Cypress, and automate via GitHub Actions.', level: 'Intermediate', duration: '5 Weeks', rating: '4.8', color: 'bg-lime-50', iconColor: 'text-lime-500' },
  { title: 'Python Machine Learning API', description: 'Train simple models with Scikit-Learn and deploy them via FastAPI.', level: 'Beginner', duration: '6 Weeks', rating: '4.5', color: 'bg-amber-50', iconColor: 'text-amber-500' },
  { title: 'Web Security Fundamentals', description: 'Protect your apps against XSS, CSRF, SQL Injection, and implement secure Auth flows.', level: 'Advanced', duration: '4 Weeks', rating: '4.9', color: 'bg-slate-50', iconColor: 'text-slate-500' },
  { title: 'React Native Mobile Apps', description: 'Take your React skills to mobile and build native iOS and Android applications.', level: 'Intermediate', duration: '10 Weeks', rating: '4.7', color: 'bg-blue-50', iconColor: 'text-blue-500' },
  { title: 'Three.js 3D Web Graphics', description: 'Build interactive 3D experiences and games directly in the browser using WebGL.', level: 'Advanced', duration: '8 Weeks', rating: '4.8', color: 'bg-rose-50', iconColor: 'text-rose-500' },
  { title: 'Next.js 14 App Router', description: 'Master React Server Components, Server Actions, and advanced caching strategies.', level: 'Intermediate', duration: '6 Weeks', rating: '4.9', color: 'bg-indigo-50', iconColor: 'text-indigo-500' },
];

const CHALLENGES = [
  { title: 'LRU Cache Implementation', description: 'Design and implement a data structure for Least Recently Used cache with O(1) time complexity for all operations.', difficulty: 'MEDIUM', track: 'Data Structures', xp: 450, completion: 64, iconType: 'FaCogs', iconBg: 'bg-yellow-100' },
  { title: 'Valid Palindrome II', description: 'Given a string, determine if it can be a palindrome by deleting at most one character from it.', difficulty: 'EASY', track: 'Algorithms', xp: 200, completion: 82, iconType: 'FaCode', iconBg: 'bg-green-100' },
  { title: 'Distributed Log Sorter', description: 'Efficiently sort millions of log entries across a distributed network with minimal latency and memory usage.', difficulty: 'HARD', track: 'System Design', xp: 1200, completion: 12, iconType: 'FaDatabase', iconBg: 'bg-red-100' },
  { title: 'Async Request Scheduler', description: 'Build a throttle mechanism that limits the number of concurrent API requests with a queue-based waiting list.', difficulty: 'MEDIUM', track: 'Algorithms', xp: 550, completion: 41, iconType: 'FaServer', iconBg: 'bg-blue-100' },
  { title: 'Bento Layout Generator', description: 'Create an algorithm that arranges dynamic cards into an optimal bento-grid layout minimizing empty space.', difficulty: 'MEDIUM', track: 'Frontend Core', xp: 600, completion: 35, iconType: 'FaReact', iconBg: 'bg-indigo-100' },
  { title: 'JWT Validation Engine', description: 'Implement a secure token validation library that handles rotation and expiration with RS256 and HS256.', difficulty: 'HARD', track: 'System Design', xp: 950, completion: 18, iconType: 'FaCogs', iconBg: 'bg-rose-100' },
  { title: 'Fibonacci Memoization', description: 'Implement the Fibonacci sequence with top-down memoization and analyze space-time trade-offs.', difficulty: 'EASY', track: 'Algorithms', xp: 150, completion: 91, iconType: 'FaCode', iconBg: 'bg-teal-100' },
  { title: 'GraphQL Rate Limiter', description: 'Design a per-query rate limiting system for a GraphQL API that handles burst traffic with token bucket algorithm.', difficulty: 'HARD', track: 'System Design', xp: 1100, completion: 8, iconType: 'FaNodeJs', iconBg: 'bg-green-50' },
  { title: 'React Virtual Scroller', description: 'Build a high-performance virtual list that renders only visible rows, supporting dynamic item heights.', difficulty: 'MEDIUM', track: 'Frontend Core', xp: 700, completion: 29, iconType: 'FaReact', iconBg: 'bg-sky-100' },
  { title: 'Binary Search Variants', description: 'Solve 5 progressively harder binary search problems — from classic to rotated arrays to 2D matrix search.', difficulty: 'EASY', track: 'Algorithms', xp: 300, completion: 74, iconType: 'FaCode', iconBg: 'bg-purple-100' },
  { title: 'Kafka Consumer Group', description: 'Model and implement a Kafka-inspired consumer group system with offset management and partition rebalancing.', difficulty: 'HARD', track: 'System Design', xp: 1400, completion: 5, iconType: 'FaDatabase', iconBg: 'bg-orange-100' },
  { title: 'CSS-in-JS Theme Engine', description: 'Build a lightweight theme engine that generates CSS variables dynamically from a JavaScript token object.', difficulty: 'MEDIUM', track: 'Frontend Core', xp: 500, completion: 47, iconType: 'FaPython', iconBg: 'bg-yellow-50' },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await Project.deleteMany();
    await Lab.deleteMany();
    await Challenge.deleteMany();
    console.log('Cleared existing projects, labs, and challenges.');

    // Insert new data
    await Project.insertMany(PROJECTS);
    await Lab.insertMany(LABS);
    await Challenge.insertMany(CHALLENGES);
    console.log('Projects, Labs, and Challenges imported successfully!');

    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

seedData();
