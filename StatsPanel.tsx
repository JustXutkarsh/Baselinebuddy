import { Award, TrendingUp, Zap, Target } from 'lucide-react';

interface StatsPanelProps {
  totalScans: number;
  averageScore: number;
  currentScore: number;
  issuesFound: number;
}

export default function StatsPanel({ totalScans, averageScore, currentScore, issuesFound }: StatsPanelProps) {
  const badges = getBadgesForStats(totalScans, averageScore);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Award className="w-6 h-6 text-amber-500" />
        Your Progress
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Total Scans"
          value={totalScans.toString()}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Avg Score"
          value={averageScore.toFixed(0)}
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<Zap className="w-5 h-5" />}
          label="Current Score"
          value={currentScore.toString()}
          color="text-amber-600"
          bgColor="bg-amber-50"
        />
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Issues Found"
          value={issuesFound.toString()}
          color="text-red-600"
          bgColor="bg-red-50"
        />
      </div>

      {badges.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Earned Badges</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className="px-3 py-2 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-300 rounded-lg flex items-center gap-2 text-sm font-medium text-amber-900 shadow-sm"
              >
                <Award className="w-4 h-4" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      )}

      {badges.length === 0 && totalScans === 0 && (
        <div className="text-center py-4 text-slate-600 text-sm">
          Complete your first scan to start earning badges!
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: JSX.Element;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-lg p-4 border border-slate-200`}>
      <div className={`${color} mb-2`}>{icon}</div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-xs text-slate-600 font-medium">{label}</div>
    </div>
  );
}

function getBadgesForStats(totalScans: number, averageScore: number): string[] {
  const badges: string[] = [];

  if (totalScans >= 1) badges.push('🎯 First Scan');
  if (totalScans >= 10) badges.push('🔥 Regular User');
  if (totalScans >= 50) badges.push('⭐ Expert');

  if (averageScore >= 90) badges.push('🏆 High Compatibility');
  if (averageScore >= 95) badges.push('💎 Perfect Score Master');

  return badges;
}