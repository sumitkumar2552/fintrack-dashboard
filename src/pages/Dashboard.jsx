import { AreaChart, Area, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import useStore from '../context/useStore';
import SummaryCard from '../components/SummaryCard';
import { fmt, CHART_COLORS } from '../utils/helpers';

const Dashboard = ({ setPage }) => {
  const { getSummary, getMonthlyData, getCategoryBreakdown, transactions } = useStore();
  const { income, expense, balance } = getSummary();
  const { labels, income: inc, expense: exp } = getMonthlyData();
  const cats = getCategoryBreakdown();
  const savingsRate = income > 0 ? Math.round((balance / income) * 100) : 0;

  const trendData = labels.map((m, i) => ({ month: m, balance: inc[i] - exp[i] }));
  const catData   = cats.map(([name, value]) => ({ name, value }));
  const recent    = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryCard label="Total Balance"  value={fmt(balance)}        sub="+12.4% this month" />
        <SummaryCard label="Total Income"   value={fmt(income)}         sub="All time" />
        <SummaryCard label="Total Expenses" value={fmt(expense)}        sub="All time" subColor="text-red-500 dark:text-red-400" />
        <SummaryCard label="Savings Rate"   value={`${savingsRate}%`}   sub="Of income saved" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">Balance trend (6 months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#378ADD" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#378ADD" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => '₹' + (v / 1000).toFixed(0) + 'k'} />
              <Tooltip formatter={(v) => fmt(v)} />
              <Area type="monotone" dataKey="balance" stroke="#378ADD" fill="url(#balGrad)" strokeWidth={2} dot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">Spending by category</h3>
          <div className="flex gap-4 items-center">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={catData} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={40} paddingAngle={3}>
                  {catData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => fmt(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1.5 text-xs">
              {catData.slice(0, 6).map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="text-gray-600 dark:text-gray-400">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Recent transactions</h3>
          <button onClick={() => setPage('transactions')} className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400">View all →</button>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No transactions yet</p>
        ) : (
          <div className="space-y-2">
            {recent.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                    t.type === 'income'
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{t.desc}</p>
                    <p className="text-xs text-gray-400">{t.date} · {t.cat}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;