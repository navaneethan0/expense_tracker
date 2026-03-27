import { createContext, useContext, useReducer, useEffect } from 'react';

const FinanceContext = createContext();
const STORAGE_KEY = 'expense_tracker_transactions';

function loadTransactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveTransactions(txns) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(txns)); } catch {}
}

const initialState = {
  transactions: loadTransactions(),
  editingTransaction: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const txns = [action.payload, ...state.transactions];
      saveTransactions(txns);
      return { ...state, transactions: txns };
    }
    case 'DELETE_TRANSACTION': {
      const txns = state.transactions.filter(t => t.id !== action.payload);
      saveTransactions(txns);
      return { ...state, transactions: txns };
    }
    case 'UPDATE_TRANSACTION': {
      const txns = state.transactions.map(t => t.id === action.payload.id ? action.payload : t);
      saveTransactions(txns);
      return { ...state, transactions: txns, editingTransaction: null };
    }
    case 'SET_EDITING':
      return { ...state, editingTransaction: action.payload };
    case 'CLEAR_EDITING':
      return { ...state, editingTransaction: null };
    default:
      return state;
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totals = state.transactions.reduce((acc, t) => {
    const amount = parseFloat(t.amount) || 0;
    if (t.type === 'income') acc.income += amount;
    else acc.expense += amount;
    return acc;
  }, { income: 0, expense: 0 });

  const categoryBreakdown = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + (parseFloat(t.amount) || 0);
      return acc;
    }, {});

  return (
    <FinanceContext.Provider value={{ ...state, dispatch, totals, categoryBreakdown }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
}
