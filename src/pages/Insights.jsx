import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useStore from '../context/useStore';
import { fmt, CHART_COLORS } from '../utils/helpers';

const Insight = ({ label, value, sub, valueColor }) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{label}</p>
    <p className={`text-lg font-medium ${valueColor || 'text-gray-900 dark:text-white'}`}>{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
  </div>
);

const Insights = () => {
  const { getSummary, getMonthlyData, getCategoryBreakdown, transactions } = useStore();
  const { income, expense, balance } = getSummary();
  const { labels, income: inc, expense: exp } = getMonthlyData();
  const cats = getCategoryBreakdown();

  const topCat    = cats[0] || ['—', 0];
  const lastInc   = inc[inc.length - 1] || 0;
  const prevInc   = inc[inc.length - 2] || 0;
  const lastExp   = exp[exp.length - 1] || 0;
  const prevExp   = exp[exp.length - 2] || 0;
  const incChange = prevInc ? Math.round(((lastInc - prevInc) / prevInc) * 100) : 0;
  const expChange = prevExp ? Math.round(((lastExp - prevExp) / prevExp) * 100) : 0;
  const savingsRate    = income > 0 ? Math.round((balance / income) * 100) : 0;
  const avgMonthlyExp  = Math.round(expense / 6);

  const monthlyData = labels.map((m, i) => ({ month: m, income: inc[i], expense: exp[i] }));
  const catBarData  = cats.slice(0, 6).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">Key insights</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <Insight label="Top spending category" value={topCat[0]} sub={fmt(topCat[1]) + ' total'} />
          <Insight label="Income change (MoM)" value={`${incChange >= 0 ? '+' : ''}${incChange}%`} sub="vs last month"
            valueColor={incChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'} />
          <Insight label="Expense change (MoM)" value={`${expChange >= 0 ? '+' : ''}${expChange}%`} sub="vs last month"
            valueColor={expChange <= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'} />
          <Insight label="Savings rate" value={`${savingsRate}%`} sub="Of total income" />
          <Insight label="Avg monthly expense" value={fmt(avgMonthlyExp)} sub="Last 6 months" />
          <Insight label="Total transactions" value={String(transactions.length)}
            sub={`${transactions.filter(t => t.type === 'income').length} income · ${transactions.filter(t => t.type === 'expense').length} expense`} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Monthly income vs expenses</h3>
          <div className="flex gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-blue-500" /> Income</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-red-400" /> Expenses</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => '₹' + (v / 1000).toFixed(0) + 'k'} />
              <Tooltip formatter={(v) => fmt(v)} />
              <Bar dataKey="income"  fill="#378ADD" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#E24B4A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">Top spending categories</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={catBarData} layout="vertical" barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => '₹' + (v / 1000).toFixed(0) + 'k'} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
              <Tooltip formatter={(v) => fmt(v)} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {catBarData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Insights;