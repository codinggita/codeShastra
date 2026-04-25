import React, { useState } from 'react';
import { FiArrowLeft, FiAlertCircle, FiInfo, FiActivity, FiCpu, FiPlay, FiSend, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const DebuggingLab = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('Memory Profile');

  // --- View 1: Challenge Mode ---
  const renderChallengeView = () => (
    <div className="flex h-[calc(100vh-4rem)] bg-[#f8f9fa] overflow-hidden">
      {/* Left Panel: Description */}
      <div className="w-1/3 p-8 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-2 py-1 text-xs font-bold text-orange-700 bg-orange-100 rounded">HARD</span>
          <span className="text-sm text-gray-500 font-medium">Challenge #42</span>
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
          Implement a custom debounce function
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          In high-frequency event scenarios (like window resizing or search inputs), you often need to limit how often a function is executed.
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your task is to implement a debounce function which accepts a callback and a wait time, returning a new function that delays execution until after <code>wait</code> milliseconds have elapsed since the last time the debounced function was invoked.
        </p>

        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Example</h3>
          <pre className="text-sm text-blue-800 font-mono whitespace-pre-wrap">
{`const log = debounce(() => 
  console.log('Hi'), 1000);
log(); log(); log(); // Only "Hi" after 1s`}
          </pre>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4">Constraints</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>The function must preserve the <code>this</code> context.</li>
          <li>The function should handle arguments correctly.</li>
          <li>Wait time is always non-negative.</li>
        </ul>
      </div>

      {/* Middle Panel: Code Editor */}
      <div className="w-[40%] bg-[#282a36] flex flex-col border-r border-gray-800">
        <div className="h-12 bg-[#21222c] border-b border-gray-700 flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
            <span>{'<>'}</span>
            <span className="font-semibold text-gray-200">INDEX.JS</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Auto-saving...
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto font-mono text-sm leading-relaxed">
          <div className="flex">
            <div className="text-gray-600 select-none pr-4 text-right min-w-[2.5rem]">
              1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12
            </div>
            <div className="text-[#f8f8f2]">
              <span className="text-[#6272a4]">// Implement your debounce here</span><br/>
              <span className="text-[#ff79c6]">function</span> <span className="text-[#50fa7b]">debounce</span>(func, wait) {'{'}<br/>
              &nbsp;&nbsp;<span className="text-[#ff79c6]">let</span> timeout;<br/>
              <br/>
              &nbsp;&nbsp;<span className="text-[#ff79c6]">return function</span>(...args) {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ff79c6]">const</span> context = <span className="text-[#bd93f9]">this</span>;<br/>
              <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6272a4]">// Clear existing timer</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#8be9fd]">clearTimeout</span>(timeout);<br/>
              <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="bg-[#6272a4]/30 px-1 italic text-[#f1fa8c]">/* TYPE YOUR SOLUTION HERE */</span><br/>
              &nbsp;&nbsp;{'}'};<br/>
              {'}'}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Tests & Output */}
      <div className="flex-1 flex flex-col bg-[#f8f9fa] p-6 overflow-y-auto">
        <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-4 flex items-center gap-2">
          <FiActivity /> TEST CASES
        </h3>
        
        <div className="space-y-3 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 text-sm">Basic Debouncing</p>
              <p className="text-xs text-gray-500 mt-0.5">Executes after 100ms delay</p>
            </div>
            <FiXCircle className="text-red-500 text-xl" />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between opacity-60">
            <div>
              <p className="font-semibold text-gray-900 text-sm">Context Preservation</p>
              <p className="text-xs text-gray-500 mt-0.5">Checks 'this' binding</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-gray-200"></div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between opacity-60">
            <div>
              <p className="font-semibold text-gray-900 text-sm">Argument Handling</p>
              <p className="text-xs text-gray-500 mt-0.5">Passes rest parameters</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-gray-200"></div>
          </div>
        </div>

        <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-4 flex items-center gap-2">
          <span className="font-mono">{'>_'}</span> OUTPUT TERMINAL
        </h3>
        <div className="flex-1 bg-[#282a36] rounded-xl p-4 font-mono text-xs text-gray-300 shadow-inner overflow-y-auto mb-6">
          <p className="mb-2">$ running tests...</p>
          <p className="text-red-400 leading-relaxed">
            × Test Case 1: Expected callback to be called once.<br/>
            &nbsp;&nbsp;Actual: Called 0 times.
          </p>
          <span className="animate-pulse">_</span>
        </div>

        <div className="flex gap-3 justify-end mt-auto pt-4 border-t border-gray-200">
          <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 px-6 font-semibold" leftIcon={<FiPlay />}>
            Run
          </Button>
          <Button 
            variant="primary" 
            className="px-6 font-semibold bg-primary hover:bg-indigo-700 shadow-md" 
            leftIcon={<FiSend />}
            onClick={() => setIsSubmitted(true)}
          >
            Submit Challenge
          </Button>
        </div>
      </div>
    </div>
  );

  // --- View 2: Analysis Mode ---
  const renderAnalysisView = () => (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white overflow-hidden">
      {/* Sub-header */}
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSubmitted(false)} className="text-gray-500 hover:text-gray-900 transition-colors">
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-gray-900 text-sm">Debugging Lab: Memory Leak</h2>
            <p className="text-xs text-gray-500">Fix the memory leak in the React useEffect hook</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-primary bg-blue-50 px-3 py-1.5 rounded-full">
            <FiActivity className="animate-pulse" /> 04:12 Remaining
          </div>
          <Button variant="primary" size="sm" className="font-semibold shadow-sm">Submit Fix</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Editor with Error Highlight */}
        <div className="w-[45%] bg-[#282a36] flex flex-col border-r border-gray-200">
          <div className="h-10 bg-[#21222c] border-b border-gray-800 flex items-center px-4">
            <span className="font-mono text-xs text-gray-400 font-semibold uppercase tracking-wider">UserProfile.tsx</span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto font-mono text-[13px] leading-relaxed">
            <div className="flex">
              <div className="text-gray-600 select-none pr-4 text-right min-w-[2.5rem]">
                1<br/>2<br/>3<br/>4<br/>5<br/>
                <span className="text-red-400 font-bold bg-red-500/10 block -mx-1 px-1">6</span>
                <span className="text-red-400 font-bold bg-red-500/10 block -mx-1 px-1">7</span>
                <span className="text-red-400 font-bold bg-red-500/10 block -mx-1 px-1">8</span>
                <span className="text-red-400 font-bold bg-red-500/10 block -mx-1 px-1">9</span>
                <span className="text-red-400 font-bold bg-red-500/10 block -mx-1 px-1">10</span>
                11<br/>12<br/>13<br/>14<br/>15<br/>16
              </div>
              <div className="text-[#f8f8f2] flex-1">
                <span className="text-[#ff79c6]">import</span> React, {'{'} useState, useEffect {'}'} <span className="text-[#ff79c6]">from</span> <span className="text-[#f1fa8c]">'react'</span>;<br/><br/>
                <span className="text-[#ff79c6]">export const</span> <span className="text-[#50fa7b]">UserProfile</span> = ({'{'} userId {'}'}) {'=>'} {'{'}<br/>
                &nbsp;&nbsp;<span className="text-[#ff79c6]">const</span> [userData, setUserData] = <span className="text-[#8be9fd]">useState</span>(<span className="text-[#bd93f9]">null</span>);<br/><br/>
                
                {/* Highlighted error block */}
                <div className="bg-red-500/10 border-l-2 border-red-500 -ml-[19px] pl-[17px] py-1 w-full relative">
                  &nbsp;&nbsp;<span className="text-[#8be9fd]">useEffect</span>(() {'=>'} {'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ff79c6]">const</span> socket = <span className="text-[#8be9fd]">connectToSocket</span>(userId);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;socket.<span className="text-[#8be9fd]">on</span>(<span className="text-[#f1fa8c]">'update'</span>, (data) {'=>'} {'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#8be9fd]">setUserData</span>(data);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;{'}'});<br/>
                </div>
                
                &nbsp;&nbsp;{'}'}, [userId]);<br/><br/>
                &nbsp;&nbsp;<span className="text-[#ff79c6]">return</span> (<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-[#ff79c6]">div</span>{'>'}{'{'}userData?.name{'}'}{'</'}<span className="text-[#ff79c6]">div</span>{'>'}<br/>
                &nbsp;&nbsp;);<br/>
                {'}'};
              </div>
            </div>
          </div>
          <div className="h-8 bg-[#21222c] border-t border-gray-800 flex items-center justify-between px-4 text-[11px] text-gray-500 font-mono">
            <span>Ln 6, Col 12 &nbsp;&nbsp;Spaces: 2 &nbsp;&nbsp;UTF-8</span>
            <span className="font-semibold text-gray-400">TYPESCRIPT JSX</span>
          </div>
        </div>

        {/* Right Panel: Analysis Tools */}
        <div className="flex-1 bg-gray-50 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-white px-2">
            {['Console', 'Network', 'Memory Profile', 'Elements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-md" />}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'Memory Profile' ? (
              <div className="space-y-6 max-w-2xl mx-auto">
                {/* Warning Alert */}
                <div className="bg-white border border-red-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <FiAlertCircle className="text-red-500 text-xl mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Warning: Memory leak detected</h4>
                        <p className="text-sm text-gray-600 mt-1">Subscription remained active after UserProfile unmounted. Ensure effect cleanup.</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">14:02:11.45</span>
                  </div>
                </div>

                {/* Info Alert */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-start">
                  <div className="flex gap-3">
                    <FiInfo className="text-gray-400 text-xl mt-0.5" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Socket connected</h4>
                      <p className="text-sm text-gray-500 mt-1 font-mono text-xs">Handshake complete with userId: 'usr_82394'</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">14:02:10.92</span>
                </div>

                {/* Chart Card */}
                <div className="bg-white border border-indigo-100 rounded-xl p-6 shadow-sm relative overflow-hidden bg-gradient-to-br from-white to-blue-50/50">
                  <div className="flex justify-between items-end mb-8 relative z-10">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Heap Allocation</h3>
                      <p className="text-xs text-gray-500 mt-1">Real-time heap consumption</p>
                    </div>
                    <div className="text-3xl font-extrabold text-primary tracking-tight">142.4 MB</div>
                  </div>
                  
                  {/* CSS Bar Chart Mock */}
                  <div className="h-32 flex items-end gap-2 relative z-10">
                    <div className="w-full bg-indigo-200 rounded-t-sm h-[30%] opacity-70 transition-all hover:opacity-100"></div>
                    <div className="w-full bg-indigo-300 rounded-t-sm h-[45%] opacity-70 transition-all hover:opacity-100"></div>
                    <div className="w-full bg-indigo-400 rounded-t-sm h-[55%] opacity-70 transition-all hover:opacity-100"></div>
                    <div className="w-full bg-indigo-300 rounded-t-sm h-[40%] opacity-70 transition-all hover:opacity-100"></div>
                    <div className="w-full bg-red-400 rounded-t-sm h-[85%] opacity-90 transition-all shadow-[0_0_15px_rgba(248,113,113,0.5)]"></div>
                  </div>
                  
                  {/* Decorative background blur */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
                </div>

                {/* Grid Tools */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: FiActivity, title: "Heap Snapshot", desc: "Inspect objects currently in memory" },
                    { icon: FiPlay, title: "Step Through", desc: "Execute line-by-line debugging" },
                    { icon: FiActivity, title: "Event Listeners", desc: "View all active DOM and Socket listeners" },
                    { icon: FiActivity, title: "Allocation Timeline", desc: "Track object creation over 60s" }
                  ].map((tool, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                        <tool.icon size={16} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{tool.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 font-medium">
                {activeTab} view not implemented in this mock.
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200 bg-white flex justify-end gap-3">
            <Button variant="outline" className="bg-gray-50 text-gray-700 font-semibold border-gray-200 hover:bg-gray-100" size="sm">
              Clear Console
            </Button>
            <Button variant="primary" className="font-semibold shadow-sm bg-indigo-600 hover:bg-indigo-700" size="sm" leftIcon={<FiCpu />}>
              Force GC
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return isSubmitted ? renderAnalysisView() : renderChallengeView();
};

export default DebuggingLab;
