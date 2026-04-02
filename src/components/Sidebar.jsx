import { LayoutDashboard, ArrowLeftRight, Lightbulb, X } from 'lucide-react';
import useStore from '../context/useStore';

const NAV = [
  { key: 'dashboard',    label: 'Dashboard',    Icon: LayoutDashboard },
  { key: 'transactions', label: 'Transactions', Icon: ArrowLeftRight },
  { key: 'insights',     label: 'Insights',     Icon: Lightbulb },
];

const Sidebar = ({ page, setPage, open, onClose }) => {
  const { role } = useStore();
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed top-0 left-0 h-full w-56 bg-white dark:bg-gray-900
        border-r border-gray-100 dark:border-gray-800
        flex flex-col p-4 z-30 transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-medium">F</div>
            <span className="text-base font-medium text-gray-900 dark:text-white">FinTrack</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => { setPage(key); onClose(); }}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                ${page === key
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-3 mt-3">
          <p className="text-xs text-gray-400 px-3">Logged in as</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 mt-0.5">
            {role === 'admin' ? 'Sumit Kumar' : 'Guest User'}
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;