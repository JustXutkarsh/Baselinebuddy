import { AlertTriangle, CheckCircle, Info, ExternalLink, Copy, Check } from 'lucide-react';
import { CompatibilityResult, CompatibilityIssue } from '../services/compatibilityChecker';
import { useState } from 'react';

interface CompatibilityResultsProps {
  result: CompatibilityResult;
}

export default function CompatibilityResults({ result }: CompatibilityResultsProps) {
  const [copiedFix, setCopiedFix] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'medium':
        return <Info className="w-5 h-5 text-amber-600" />;
      case 'low':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-600" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-700 bg-green-100';
    if (score >= 70) return 'text-amber-700 bg-amber-100';
    return 'text-red-700 bg-red-100';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const handleCopyFix = async (fix: string, issueId: string) => {
    await navigator.clipboard.writeText(fix);
    setCopiedFix(issueId);
    setTimeout(() => setCopiedFix(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Compatibility Report</h2>
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-lg font-bold text-3xl ${getScoreColor(result.score)}`}>
              {getScoreGrade(result.score)}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-slate-800">{result.score}</div>
              <div className="text-sm text-slate-600">out of 100</div>
            </div>
          </div>
        </div>

        <p className="text-slate-700 mb-6 leading-relaxed">{result.summary}</p>

        {result.issues.length === 0 ? (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <div className="font-semibold text-green-800">Excellent! No compatibility issues found.</div>
              <div className="text-sm text-green-700">Your code uses widely supported web features.</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">
                Found {result.issues.length} issue{result.issues.length !== 1 ? 's' : ''}
              </h3>
              <div className="flex gap-2 text-sm">
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                  {result.issues.filter(i => i.severity === 'high').length} high
                </span>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded">
                  {result.issues.filter(i => i.severity === 'medium').length} medium
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {result.issues.filter(i => i.severity === 'low').length} low
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {result.issues.map((issue, index) => (
                <IssueCard
                  key={index}
                  issue={issue}
                  index={index}
                  getSeverityColor={getSeverityColor}
                  getSeverityIcon={getSeverityIcon}
                  copiedFix={copiedFix}
                  onCopyFix={handleCopyFix}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {result.fixedCode && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-slate-800">Auto-Fixed Code</h3>
          </div>
          <pre className="bg-slate-50 border border-slate-300 rounded-lg p-4 overflow-x-auto text-sm font-mono">
            <code>{result.fixedCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

function IssueCard({
  issue,
  index,
  getSeverityColor,
  getSeverityIcon,
  copiedFix,
  onCopyFix,
}: {
  issue: CompatibilityIssue;
  index: number;
  getSeverityColor: (severity: string) => string;
  getSeverityIcon: (severity: string) => JSX.Element;
  copiedFix: string | null;
  onCopyFix: (fix: string, issueId: string) => void;
}) {
  const issueId = `issue-${index}`;
  const isCopied = copiedFix === issueId;

  return (
    <div className={`border rounded-lg p-5 ${getSeverityColor(issue.severity)}`}>
      <div className="flex items-start gap-3">
        {getSeverityIcon(issue.severity)}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-lg">{issue.featureName}</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-semibold px-2 py-1 rounded bg-white bg-opacity-60">
                {issue.baselineStatus.replace('_', ' ')}
              </span>
              {issue.lineNumber && (
                <span className="text-xs px-2 py-1 rounded bg-white bg-opacity-60">
                  Line {issue.lineNumber}
                </span>
              )}
            </div>
          </div>

          <p className="mb-3 leading-relaxed">{issue.description}</p>

          {issue.browsersUnsupported.length > 0 && (
            <div className="mb-3">
              <div className="text-sm font-semibold mb-2">Browser Support Issues:</div>
              <div className="flex flex-wrap gap-2">
                {issue.browsersUnsupported.map((browser, idx) => (
                  <div
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-white bg-opacity-80 border border-current"
                  >
                    {browser.name} {browser.version} - {browser.supportStatus}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white bg-opacity-60 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">Suggested Fix:</div>
              <button
                onClick={() => onCopyFix(issue.suggestedFix, issueId)}
                className="text-xs px-2 py-1 rounded bg-white hover:bg-opacity-80 transition-all flex items-center gap-1"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="text-sm font-mono whitespace-pre-wrap">{issue.suggestedFix}</pre>
          </div>

          {issue.mdnLink && (
            <a
              href={issue.mdnLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              View on MDN
            </a>
          )}
        </div>
      </div>
    </div>
  );
}