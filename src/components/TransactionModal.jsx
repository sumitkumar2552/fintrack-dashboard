import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../data/transactions';

const emptyForm = { desc: '', amount: '', type: 'income', cat: 'Salary', date: '' };

const TransactionModal = ({ open, onClose, onSave, initial }) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...initial, amount: String(initial.amount) } : {
        ...emptyForm,
        date: new Date().toISOString().split('T')[0],
      });
      setError('');
    }
  }, [open, initial]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.desc.trim() || !form.amount || !form.date) {
      setError('Please fill in all fields.');
      return;
    }
    onSave({ ...form, amount: parseFloat(form.amount) });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-medium text-gray-900 dark:text-white">
            {initial ? 'Edit transaction' : 'Add transaction'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={18} />
          </button>
        </div>

        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

        <div className="space-y-4">
          <Field label="Description">
            <input className="input-base" placeholder="e.g. Monthly Salary" value={form.desc} onChange={(e) => set('desc', e.target.value)} />
          </Field>
          <Field label="Amount (₹)">
            <input className="input-base" type="number" placeholder="0" value={form.amount} onChange={(e) => set('amount', e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Type">
              <select className="input-base" value={form.type} onChange={(e) => set('type', e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </Field>
            <Field label="Category">
              <select className="input-base" value={form.cat} onChange={(e) => set('cat', e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Date">
            <input className="input-base" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
          </Field>
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} className="btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{label}</label>
    {children}
  </div>
);

export default TransactionModal;