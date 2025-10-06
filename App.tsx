import { useState } from 'react';
import { Globe, Github, Sparkles } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import CompatibilityResults from './components/CompatibilityResults';
import BrowserVisualizer from './components/BrowserVisualizer';
import StatsPanel from './components/StatsPanel';
import { analyzeCodeCompatibility, CompatibilityResult } from './services/compatibilityChecker';

function App() {
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stats, setStats] = useState({
    totalScans: 0,
    averageScore: 0,
    currentScore: 0,
    issuesFound: 0,
  });

  const handleAnalyze = async (code: string, language: string) => {
    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeCodeCompatibility(code, language);
      setResult(analysisResult);

      const newTotalScans = stats.totalScans + 1;
      const newAverageScore =
        (stats.averageScore * stats.totalScans + analysisResult.score) / newTotalScans;

      setStats({
        totalScans: newTotalScans,
        averageScore: newAverageScore,
        currentScore: analysisResult.score,
        issuesFound: analysisResult.issues.length,
      });
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl shadow-lg">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Baseline Buddy</h1>
                <p className="text-sm text-slate-600">AI-Powered Web Compatibility Assistant</p>
              </div>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Powered by GPT-4 & Baseline Data
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Ship modern web features — without breaking the old web
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Analyze your code for browser compatibility issues, get AI-powered fix suggestions,
            and ensure your web applications work across all major browsers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-8">
          <CodeEditor onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>

        {result && (
          <div className="space-y-8">
            <StatsPanel
              totalScans={stats.totalScans}
              averageScore={stats.averageScore}
              currentScore={stats.currentScore}
              issuesFound={stats.issuesFound}
            />

            <BrowserVisualizer issues={result.issues} />

            <CompatibilityResults result={result} />
          </div>
        )}

        {!result && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <Globe className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Ready to Check Browser Compatibility?
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Paste your JavaScript, TypeScript, CSS, or HTML code in the editor above and click
                "Analyze Code" to get instant compatibility insights powered by AI and Baseline data.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <FeatureCard
                  title="Real-Time Analysis"
                  description="Instant detection of browser compatibility issues using Baseline data"
                />
                <FeatureCard
                  title="AI-Powered Fixes"
                  description="Get smart suggestions for polyfills, fallbacks, and alternative approaches"
                />
                <FeatureCard
                  title="Visual Reports"
                  description="See browser support data with beautiful visualizations and detailed insights"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-600 text-sm">
          <p>
            Built for the Baseline Hackathon • Using GPT-4 & MDN Web Features Data
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
      <h4 className="font-semibold text-slate-800 mb-2">{title}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

export default App;