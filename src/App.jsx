import { useState, useEffect } from 'react';
import useStore from './context/useStore';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';

const App = () => {
  const { darkMode } = useStore();
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const pages = { dashboard: Dashboard, transactions: Transactions, insights: Insights };
  const Page = pages[page];

  return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex font-sans">
    <Sidebar page={page} setPage={setPage} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    <main className="flex-1 min-w-0 p-4 lg:p-6 ml-0 lg:ml-56">
      <Topbar page={page} onMenuClick={() => setSidebarOpen(true)} />
      <Page setPage={setPage} />
    </main>
  </div>
);
};

export default App;