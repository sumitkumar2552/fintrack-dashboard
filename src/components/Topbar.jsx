import { Menu, Moon, Sun, Download } from 'lucide-react';
import useStore from '../context/useStore';
import { exportToCSV } from '../utils/helpers';

const PAGE_TITLES = { dashboard: 'Dashboard', transactions: 'Transactions', insights: 'Insights' };

const Topbar = ({ page, onMenuClick }) => {
  const { role, setRole, darkMode, toggleDarkMode, transactions } = useStore();

  return (
    <header className="flex items-center justify-between mb-6 gap-3 flex-wrap">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
          <Menu size={16} />
        </button>
        <h1 className="text-lg font-medium text-gray-900 dark:text-white">{PAGE_TITLES[page]}</h1>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
          role === 'admin'
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            : 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
        }`}>
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </span>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-pointer"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <button onClick={toggleDarkMode} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button onClick={() => exportToCSV(transactions)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Download size={13} /> Export CSV
        </button>
      </div>
    </header>
  );
};

export default Topbar;