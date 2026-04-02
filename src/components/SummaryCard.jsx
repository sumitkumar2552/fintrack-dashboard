const SummaryCard = ({ label, value, sub, subColor = 'text-green-600 dark:text-green-400' }) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-2xl font-medium text-gray-900 dark:text-white">{value}</p>
    {sub && <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>}
  </div>
);

export default SummaryCard;