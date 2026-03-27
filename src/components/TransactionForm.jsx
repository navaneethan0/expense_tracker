import { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';

const CATEGORIES = ['Food', 'Rent', 'Salary', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Healthcare', 'Other'];

const emptyForm = { title: '', amount: '', category: 'Food', type: 'expense' };

export default function TransactionForm() {
  const { dispatch, editingTransaction } = useFinance();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        title: editingTransaction.title,
        amount: editingTransaction.amount.toString(),
        category: editingTransaction.category,
        type: editingTransaction.type,
      });
    }
  }, [editingTransaction]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) e.amount = 'Enter a valid positive amount';
    if (parseFloat(form.amount) > 999999999999) e.amount = 'Amount is too large';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const txn = {
      id: editingTransaction ? editingTransaction.id : Date.now().toString(),
      title: form.title.trim(),
      amount: parseFloat(parseFloat(form.amount).toFixed(2)),
      category: form.category,
      type: form.type,
      date: editingTransaction ? editingTransaction.date : new Date().toISOString(),
    };

    dispatch({ type: editingTransaction ? 'UPDATE_TRANSACTION' : 'ADD_TRANSACTION', payload: txn });
    setForm(emptyForm);
    setErrors({});
  };

  const handleCancel = () => {
    dispatch({ type: 'CLEAR_EDITING' });
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <form className="txn-form" onSubmit={handleSubmit} id="transaction-form">
      <h2>{editingTransaction ? '✏️ Edit Transaction' : '➕ Add Transaction'}</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" placeholder="e.g. Groceries" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} className={errors.title ? 'error' : ''} />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input id="amount" type="number" step="0.01" min="0" placeholder="0.00" value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })} className={errors.amount ? 'error' : ''} />
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Type</label>
          <div className="type-toggle">
            <button type="button" className={`type-btn ${form.type === 'expense' ? 'active expense' : ''}`}
              onClick={() => setForm({ ...form, type: 'expense' })}>Expense</button>
            <button type="button" className={`type-btn ${form.type === 'income' ? 'active income' : ''}`}
              onClick={() => setForm({ ...form, type: 'income' })}>Income</button>
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTransaction ? 'Update' : 'Add Transaction'}
        </button>
        {editingTransaction && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}
