import { useState } from 'react';
import { Code, Play, Sparkles } from 'lucide-react';

interface CodeEditorProps {
  onAnalyze: (code: string, language: string) => void;
  isAnalyzing: boolean;
}

export default function CodeEditor({ onAnalyze, isAnalyzing }: CodeEditorProps) {
  const [code, setCode] = useState(`// Example: Using modern JavaScript features
const data = await fetch('/api/data');
const result = await data.json();

// Optional chaining
const userName = user?.profile?.name;

// Nullish coalescing
const count = items ?? 0;

// Array.at()
const lastItem = array.at(-1);

// Private class fields
class MyClass {
  #privateField = 'secret';
}`);
  const [language, setLanguage] = useState('javascript');

  const handleAnalyze = () => {
    if (code.trim()) {
      onAnalyze(code, language);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code className="w-5 h-5 text-slate-300" />
          <h2 className="text-lg font-semibold text-white">Code Editor</h2>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-700 text-white px-3 py-1.5 rounded-lg border border-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
          </select>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Analyze Code
              </>
            )}
          </button>
        </div>
      </div>
      <div className="p-6">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-96 font-mono text-sm bg-slate-50 border border-slate-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Paste your code here..."
          spellCheck={false}
        />
        <div className="mt-3 text-sm text-slate-600">
          <span className="font-medium">Pro Tip:</span> Paste any JavaScript, TypeScript, CSS, or HTML code to check for browser compatibility issues.
        </div>
      </div>
    </div>
  );
}