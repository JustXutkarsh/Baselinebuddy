import { Globe } from 'lucide-react';
import { CompatibilityIssue } from '../services/compatibilityChecker';

interface BrowserVisualizerProps {
  issues: CompatibilityIssue[];
}

interface BrowserSupport {
  name: string;
  icon: JSX.Element;
  supported: number;
  partial: number;
  unsupported: number;
}

export default function BrowserVisualizer({ issues }: BrowserVisualizerProps) {
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];

  const browserData: BrowserSupport[] = browsers.map(browserName => {
    const browserIssues = issues.flatMap(issue =>
      issue.browsersUnsupported.filter(b => b.name === browserName)
    );

    const supported = issues.length - browserIssues.length;
    const unsupported = browserIssues.filter(b => b.supportStatus === 'unsupported').length;
    const partial = browserIssues.filter(b => b.supportStatus === 'partial' || b.supportStatus === 'flagged').length;

    const getIcon = () => {
      const iconClass = "w-8 h-8";
      return <Globe className={iconClass} />;
    };

    return {
      name: browserName,
      icon: getIcon(),
      supported,
      partial,
      unsupported,
    };
  });

  const totalFeatures = issues.length || 1;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Browser Support Overview</h2>

      {issues.length === 0 ? (
        <div className="text-center py-8 text-slate-600">
          Run a compatibility check to see browser support data.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {browserData.map(browser => {
            const supportPercentage = Math.round((browser.supported / totalFeatures) * 100);

            return (
              <div key={browser.name} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-slate-700">{browser.icon}</div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{browser.name}</h3>
                    <div className="text-2xl font-bold text-slate-900">{supportPercentage}%</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      style={{ width: `${supportPercentage}%` }}
                    />
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Supported</span>
                      <span className="font-semibold text-green-700">{browser.supported}</span>
                    </div>
                    {browser.partial > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Partial/Flagged</span>
                        <span className="font-semibold text-amber-700">{browser.partial}</span>
                      </div>
                    )}
                    {browser.unsupported > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Unsupported</span>
                        <span className="font-semibold text-red-700">{browser.unsupported}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-semibold text-slate-800 mb-2">Legend</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-slate-700"><strong>Supported:</strong> Feature works fully</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-600"></div>
            <span className="text-slate-700"><strong>Partial:</strong> Limited or flagged support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-slate-700"><strong>Unsupported:</strong> Feature not available</span>
          </div>
        </div>
      </div>
    </div>
  );
}