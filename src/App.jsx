import { FinanceProvider } from './context/FinanceContext';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import ExpenseChart from './components/ExpenseChart';
import TransactionList from './components/TransactionList';

function App() {
  const toggleTheme = () => {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <FinanceProvider>
      <div className="app">
        <header className="header">
          <div className="logo">
            <span className="logo-icon">💸</span>
            <h1>WealthTracker</h1>
          </div>
          <button className="btn btn-theme" onClick={toggleTheme} title="Toggle dark mode">◑</button>
        </header>
        <main className="main">
          <SummaryCards />
          <div className="content-grid">
            <div className="left-col">
              <TransactionForm />
              <TransactionList />
            </div>
            <div className="right-col">
              <ExpenseChart />
            </div>
          </div>
        </main>
        <footer className="footer">
          <p>WealthTracker · Built with React + Chart.js</p>
        </footer>
      </div>
    </FinanceProvider>
  );
}

export default App;
