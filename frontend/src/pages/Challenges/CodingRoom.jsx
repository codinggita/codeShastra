import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiCheck, FiSettings, FiTerminal, FiAlertCircle, FiZap } from 'react-icons/fi';
import Editor from '@monaco-editor/react';
import { useDispatch } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import { updateUser } from '@/store/slices/authSlice';
import submissionService from '@/services/submissionService';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', defaultCode: '// Write your JavaScript code here\n\nfunction solution() {\n  return "Hello World";\n}\n' },
  { id: 'python', name: 'Python', defaultCode: '# Write your Python code here\n\ndef solution():\n    return "Hello World"\n' },
  { id: 'cpp', name: 'C++', defaultCode: '// Write your C++ code here\n#include <iostream>\n\nint main() {\n    std::cout << "Hello World";\n    return 0;\n}\n' },
  { id: 'java', name: 'Java', defaultCode: '// Write your Java code here\nclass Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}\n' },
];

export const CodingRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(language.defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const editorRef = useRef(null);

  // Fetch challenge data
  const { data: challenge, isLoading, error } = useFetch(`/challenges/${id}`);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (e) => {
    const selectedLang = LANGUAGES.find(lang => lang.id === e.target.value);
    if (selectedLang) {
      setLanguage(selectedLang);
      setCode(selectedLang.defaultCode);
    }
  };

  const runCode = async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setOutput('Executing code on secure evaluation server...');
    
    try {
      const result = await submissionService.runCode(code, language.id);
      setOutput(result.output || 'No output.');
    } catch (err) {
      console.error(err);
      setOutput(`Execution failed:\n${err.response?.data?.message || err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setSubmitSuccess(false);
    setOutput('Submitting solution for evaluation...');
    
    try {
      const result = await submissionService.submitCode(id, code, language.id);
      setOutput(result.output);

      if (result.success && result.user) {
        // Sync updated user (with new XP + level) into Redux + localStorage
        dispatch(updateUser(result.user));
        setSubmitSuccess(true);
        toast.success(`+${result.xpAwarded} XP earned! Level ${result.user.level}`, {
          icon: '⚡',
          duration: 4000,
          style: { background: '#1e1e1e', color: '#a3e635', border: '1px solid #374151' },
        });
      }
    } catch (err) {
      console.error(err);
      setOutput(`Submission failed:\n${err.response?.data?.message || err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center text-white">
        <CircularProgress color="inherit" className="mb-4" />
        <p className="text-gray-400">Loading workspace...</p>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center text-white">
        <FiAlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Challenge Not Found</h2>
        <p className="text-gray-400 mb-6">{error || 'Could not load challenge data.'}</p>
        <button onClick={() => navigate('/challenges')} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold transition-colors">
          Return to Challenges
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-gray-300 font-sans overflow-hidden">
      
      {/* ── Top Navbar ────────────────────────────────────────────── */}
      <div className="h-14 border-b border-gray-800 bg-[#252526] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/challenges/${id}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft /> <span className="text-sm font-semibold">Exit</span>
          </button>
          <div className="h-6 w-px bg-gray-700 mx-2"></div>
          <h1 className="text-sm font-bold text-white tracking-wide">{challenge.title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#1e1e1e] border border-gray-700 rounded-md px-2 py-1">
            <FiSettings className="text-gray-400" size={14} />
            <select 
              className="bg-transparent text-sm text-gray-300 outline-none cursor-pointer"
              value={language.id}
              onChange={handleLanguageChange}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id} className="bg-[#252526] text-white">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white text-sm font-semibold py-1.5 px-4 rounded-md transition-colors"
          >
            <FiPlay size={14} /> Run
          </button>
          
          <button 
            onClick={submitCode}
            disabled={isRunning}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold py-1.5 px-4 rounded-md transition-colors shadow-lg shadow-green-900/20"
          >
            <FiCheck size={14} /> Submit
          </button>
        </div>
      </div>

      {/* ── Main Workspace ────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Description */}
        <div className="w-1/3 border-r border-gray-800 bg-[#1e1e1e] flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wider ${challenge.difficulty === 'EASY' ? 'bg-green-900/30 text-green-400' : challenge.difficulty === 'MEDIUM' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'}`}>
                {challenge.difficulty}
              </span>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-800 text-gray-400 tracking-wider">
                {challenge.track}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-6">{challenge.title}</h2>
            
            <div className="prose prose-invert prose-sm max-w-none text-gray-400">
              <p className="whitespace-pre-wrap leading-relaxed">{challenge.description}</p>
              
              <h3 className="text-white mt-8 mb-3 font-semibold text-base border-b border-gray-800 pb-2">Examples</h3>
              <div className="bg-[#2d2d2d] rounded-lg p-4 font-mono text-xs mb-4 text-gray-300">
                <p><span className="text-gray-500">Input:</span> nums = [2,7,11,15], target = 9</p>
                <p><span className="text-gray-500">Output:</span> [0,1]</p>
                <p><span className="text-gray-500">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
              </div>

              <h3 className="text-white mt-8 mb-3 font-semibold text-base border-b border-gray-800 pb-2">Constraints</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><code>2 &lt;= nums.length &lt;= 10^4</code></li>
                <li><code>-10^9 &lt;= nums[i] &lt;= 10^9</code></li>
                <li><code>-10^9 &lt;= target &lt;= 10^9</code></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel: Editor & Console */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Editor Area */}
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={language.id}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineHeight: 24,
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                wordWrap: "on"
              }}
            />
          </div>

          {/* Console Area */}
          <div className="h-64 border-t border-gray-800 bg-[#1e1e1e] flex flex-col flex-shrink-0">
            <div className="h-10 border-b border-gray-800 flex items-center px-4 bg-[#252526]">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <FiTerminal size={14} /> Output Console
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
              {isRunning && !output ? (
                <div className="flex items-center gap-3 text-indigo-400">
                  <CircularProgress size={16} color="inherit" />
                  <span>Evaluating code...</span>
                </div>
              ) : output ? (
                <pre className={`whitespace-pre-wrap ${output.includes('Passed') ? 'text-green-400' : 'text-gray-300'}`}>
                  {output}
                </pre>
              ) : (
                <div className="text-gray-500 italic">
                  Run or submit your code to see the output here.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CodingRoom;
