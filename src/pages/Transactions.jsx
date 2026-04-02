import { useState } from 'react';
import { Search, Plus, Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import useStore from '../context/useStore';
import TransactionModal from '../components/TransactionModal';
import { fmt } from '../utils/helpers';
import { CATEGORIES } from '../data/transactions';

const Transactions = () => {
  const { role, filters, setFilter, resetFilters, getFiltered, addTransaction, updateTransaction, deleteTransaction } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const txns = getFiltered();

  const openAdd  = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (t) => { setEditTarget(t); setModalOpen(true); };
  const handleSave = (data) => {
    if (editTarget) updateTransaction(editTarget.id, data);
    else addTransaction(data);
  };

  const toggleSort = (field) => {
    setFilter('sortBy', filters.sortBy === `${field}-desc` ? `${field}-asc` : `${field}-desc`);
  };

  const SortIcon = ({ field }) => {
    if (filters.sortBy === `${field}-desc`) return <ChevronDown size={12} />;
    if (filters.sortBy === `${field}-asc`)  return <ChevronUp size={12} />;
    return <span className="w-3" />;
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">All transactions</h3>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." value={filters.search} onChange={(e) => setFilter('search', e.target.value)}
                className="pl-7 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-36" />
            </div>
            <select value={filters.type} onChange={(e) => setFilter('type', e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              <option value="">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select value={filters.category} onChange={(e) => setFilter('category', e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              <option value="">All categories</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button onClick={resetFilters} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">Reset</button>
            {role === 'admin' && (
              <button onClick={openAdd} className="btn-primary flex items-center gap-1"><Plus size={13} /> Add</button>
            )}
          </div>
        </div>

        {txns.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">No transactions match your filters</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 pb-2 pr-4 cursor-pointer" onClick={() => toggleSort('date')}>
                    <span className="flex items-center gap-1">Date <SortIcon field="date" /></span>
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 pb-2 pr-4">Description</th>
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 pb-2 pr-4">Category</th>
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 pb-2 pr-4">Type</th>
                  <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 pb-2 cursor-pointer" onClick={() => toggleSort('amount')}>
                    <span className="flex items-center justify-end gap-1">Amount <SortIcon field="amount" /></span>
                  </th>
                  {role === 'admin' && <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 pb-2 pl-4">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {txns.map((t) => (
                  <tr key={t.id} className="border-b border-gray-50 dark:border-gray-800/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-2.5 pr-4 text-gray-500 dark:text-gray-400 text-xs">{t.date}</td>
                    <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{t.desc}</td>
                    <td className="py-2.5 pr-4">
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-lg">{t.cat}</span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${
                        t.type === 'income' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      }`}>{t.type}</span>
                    </td>
                    <td className={`py-2.5 text-right font-medium ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                      {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                    </td>
                    {role === 'admin' && (
                      <td className="py-2.5 pl-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(t)} className="text-gray-400 hover:text-blue-500 transition-colors"><Pencil size={13} /></button>
                          <button onClick={() => deleteTransaction(t.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs text-gray-400 mt-3">{txns.length} transaction{txns.length !== 1 ? 's' : ''}</p>
      </div>

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editTarget} />
    </div>
  );
};

export default Transactions;