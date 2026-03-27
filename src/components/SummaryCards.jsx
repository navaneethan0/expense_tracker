import { useFinance } from '../context/FinanceContext';

export default function SummaryCards() {
  const { totals } = useFinance();
  const balance = totals.income - totals.expense;

  const fmt = (n) => '₹' + Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="summary-cards">
      <div className="summary-card card-income">
        <span className="card-icon">📈</span>
        <div>
          <span className="card-label">Total Income</span>
          <span className="card-amount positive">{fmt(totals.income)}</span>
        </div>
      </div>
      <div className="summary-card card-expense">
        <span className="card-icon">📉</span>
        <div>
          <span className="card-label">Total Expenses</span>
          <span className="card-amount negative">{fmt(totals.expense)}</span>
        </div>
      </div>
      <div className="summary-card card-balance">
        <span className="card-icon">💰</span>
        <div>
          <span className="card-label">Net Balance</span>
          <span className={`card-amount ${balance >= 0 ? 'positive' : 'negative'}`}>
            {balance < 0 ? '-' : ''}{fmt(balance)}
          </span>
        </div>
      </div>
    </div>
  );
}
