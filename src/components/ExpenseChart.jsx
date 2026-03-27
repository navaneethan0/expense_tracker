import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useFinance } from '../context/FinanceContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4',
];

export default function ExpenseChart() {
  const { categoryBreakdown } = useFinance();
  const categories = Object.keys(categoryBreakdown);
  const amounts = Object.values(categoryBreakdown);

  if (categories.length === 0) {
    return (
      <div className="chart-section">
        <h2>📊 Expense Breakdown</h2>
        <div className="chart-empty">
          <p>Add some expenses to see the chart!</p>
        </div>
      </div>
    );
  }

  const total = amounts.reduce((a, b) => a + b, 0);

  const data = {
    labels: categories,
    datasets: [{
      data: amounts,
      backgroundColor: COLORS.slice(0, categories.length),
      borderColor: 'transparent',
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 10,
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#e2e8f0',
          font: { family: 'Inter', size: 13 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed;
            const pct = ((val / total) * 100).toFixed(1);
            return ` ₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2 })} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-section">
      <h2>📊 Expense Breakdown</h2>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
