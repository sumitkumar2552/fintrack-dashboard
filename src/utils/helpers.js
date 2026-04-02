export const fmt = (n) =>
  '₹' + Math.abs(n).toLocaleString('en-IN');

export const CHART_COLORS = [
  '#378ADD', '#1D9E75', '#BA7517', '#D4537E',
  '#7F77DD', '#D85A30', '#639922', '#E24B4A',
];

export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map((t) => [t.date, t.desc, t.cat, t.type, t.amount]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'fintrack_transactions.csv';
  a.click();
};