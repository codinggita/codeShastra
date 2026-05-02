import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Editor from '@monaco-editor/react';
import { 
  FiArrowLeft, FiPlay, FiSave, FiFolder, FiFile, 
  FiTerminal, FiSettings, FiMaximize2, FiMinimize2, FiCheck
} from 'react-icons/fi';
import useFetch from '@/hooks/useFetch';

const INITIAL_CODE = `// Welcome to the CodeShastra Workspace
// You are working on the main entry file.

import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});
`;

const FILES = [
  { name: 'src', type: 'folder', children: [
    { name: 'index.js', type: 'file', active: true },
    { name: 'routes.js', type: 'file' },
    { name: 'models.js', type: 'file' }
  ]},
  { name: 'package.json', type: 'file' },
  { name: 'README.md', type: 'file' },
];

export const ProjectWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: projectInfo, isLoading } = useFetch(`/projects/${id}`);
  
  const [code, setCode] = useState(INITIAL_CODE);
  const [isSaving, setIsSaving] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [output, setOutput] = useState('> Ready for execution...');
  
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleRun = () => {
    setOutput('> Running code...\n> Server is running on port 3000\n> [GET] /api/health 200 OK');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  if (isLoading) {
    return <div className="h-screen w-full bg-[#1e1e1e] flex items-center justify-center text-white">Loading Workspace...</div>;
  }

  return (
    <div className="h-screen w-full bg-[#0d1117] text-[#c9d1d9] flex flex-col font-sans overflow-hidden">
      <Helmet>
        <title>Workspace | {projectInfo?.title || 'Loading'}</title>
      </Helmet>

      {/* Top Navbar */}
      <div className="h-14 border-b border-[#30363d] bg-[#161b22] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/projects/${id}`)}
            className="text-[#8b949e] hover:text-white transition-colors p-1.5 rounded-md hover:bg-[#30363d]"
            title="Back to Project Overview"
          >
            <FiArrowLeft size={18} />
          </button>
          <div className="h-6 w-px bg-[#30363d]"></div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">{projectInfo?.title || 'Workspace'}</h1>
            <p className="text-[10px] text-[#8b949e] font-mono uppercase tracking-wider">Cloud Environment Ready</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 text-xs font-semibold bg-[#238636] hover:bg-[#2ea043] text-white px-3 py-1.5 rounded-md transition-colors"
          >
            {isSaving ? <FiCheck size={14} /> : <FiSave size={14} />}
            {isSaving ? 'Saved' : 'Save'}
          </button>
          <button 
            onClick={handleRun}
            className="flex items-center gap-2 text-xs font-semibold border border-[#30363d] hover:border-[#8b949e] bg-[#21262d] text-white px-3 py-1.5 rounded-md transition-colors"
          >
            <FiPlay size={14} className="text-[#a5d6ff]" />
            Run Container
          </button>
          <button 
            onClick={toggleFullscreen}
            className="text-[#8b949e] hover:text-white transition-colors p-1.5 rounded-md hover:bg-[#30363d]"
          >
            {isFullscreen ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (File Explorer) */}
        <div className="w-64 border-r border-[#30363d] bg-[#161b22] flex flex-col shrink-0">
          <div className="h-9 px-4 flex items-center border-b border-[#30363d]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8b949e]">Explorer</span>
          </div>
          <div className="p-2 space-y-0.5 overflow-y-auto font-mono text-[13px]">
            {FILES.map((file, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#21262d] rounded cursor-pointer text-[#8b949e]">
                  {file.type === 'folder' ? <FiFolder size={14} /> : <FiFile size={14} />}
                  <span>{file.name}</span>
                </div>
                {file.children && (
                  <div className="ml-4 space-y-0.5 mt-0.5">
                    {file.children.map((child, cIdx) => (
                      <div 
                        key={cIdx} 
                        className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${child.active ? 'bg-[#1f6feb]/15 text-[#58a6ff]' : 'hover:bg-[#21262d] text-[#8b949e]'}`}
                      >
                        <FiFile size={14} />
                        <span>{child.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* File Tabs */}
          <div className="h-9 flex bg-[#0d1117] border-b border-[#30363d] shrink-0">
            <div className="flex items-center gap-2 px-4 border-r border-[#30363d] bg-[#161b22] border-t-2 border-t-[#f78166] text-[#c9d1d9] text-xs font-mono cursor-pointer">
              <FiFile size={12} /> index.js
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 relative">
            <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineHeight: 24,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on"
              }}
            />
          </div>

          {/* Bottom Panel (Terminal) */}
          <div className="h-64 border-t border-[#30363d] bg-[#0d1117] flex flex-col shrink-0">
            <div className="h-9 flex items-center gap-6 px-4 border-b border-[#30363d] bg-[#161b22]">
              <button className="text-xs font-bold text-[#c9d1d9] border-b-2 border-[#f78166] h-full flex items-center gap-2">
                <FiTerminal size={12} /> TERMINAL
              </button>
              <button className="text-xs font-bold text-[#8b949e] hover:text-[#c9d1d9] h-full flex items-center gap-2 transition-colors">
                <FiSettings size={12} /> OUTPUT
              </button>
            </div>
            <div className="p-4 font-mono text-[13px] text-[#8b949e] flex-1 overflow-y-auto whitespace-pre-wrap">
              {output}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
