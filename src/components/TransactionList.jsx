import { useFinance } from '../context/FinanceContext';

export default function TransactionList() {
  const { transactions, dispatch } = useFinance();

  const fmt = (n) => '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📝</span>
        <h3>No transactions yet</h3>
        <p>Get started by adding your first transaction above!</p>
      </div>
    );
  }

  return (
    <div className="txn-list">
      <h2>📋 Transaction History</h2>
      <div className="txn-items">
        {transactions.map(txn => (
          <div key={txn.id} className={`txn-item ${txn.type}`} id={`txn-${txn.id}`}>
            <div className="txn-left">
              <span className="txn-category-badge">{txn.category}</span>
              <div className="txn-info">
                <span className="txn-title">{txn.title}</span>
                <span className="txn-date">{formatDate(txn.date)}</span>
              </div>
            </div>
            <div className="txn-right">
              <span className={`txn-amount ${txn.type}`}>
                {txn.type === 'income' ? '+' : '-'}{fmt(txn.amount)}
              </span>
              <div className="txn-actions">
                <button className="action-btn edit-btn" title="Edit"
                  onClick={() => dispatch({ type: 'SET_EDITING', payload: txn })}>✏️</button>
                <button className="action-btn delete-btn" title="Delete"
                  onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: txn.id })}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
