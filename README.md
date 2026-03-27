# 💸 WealthTracker — Personal Wealth & Expense Tracker

A sleek, client-side personal finance manager built with React. Add income/expense transactions, see real-time financial summaries, and visualize expense breakdowns with interactive charts.

---

## ✨ Features

- **Transaction Entry** — Add transactions with Title, Amount, Category, and Type (Income/Expense)
- **Financial Summary** — Three cards showing Total Income, Total Expenses, and Net Balance
- **Expense Chart** — Doughnut chart breaking down expenses by category (updates instantly)
- **Transaction History** — Full log with edit and delete capabilities
- **Empty State** — Friendly prompt when no transactions exist
- **Dark/Light Mode** — Toggle with persisted preference
- **Data Persistence** — All transactions stored in LocalStorage
- **Validation** — Prevents empty fields, non-numeric amounts, and extremely large numbers
- **Currency Formatting** — Proper INR formatting with 2 decimal places (₹10.00)

---

## 🛠 Tech Stack

| Technology | Why |
|---|---|
| **React 18** | Component-based architecture with hooks |
| **Vite 5** | Fast dev server and builds |
| **React Context + useReducer** | Lightweight state management |
| **Chart.js + react-chartjs-2** | Beautiful, responsive doughnut chart |
| **LocalStorage** | Persistent transaction storage |
| **Vanilla CSS** | Full theme control with CSS custom properties |

---

## 🚀 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/DhilipKumar-Creator/expense-tracker.git
cd expense-tracker

# Install dependencies
npm install

# Start dev server
npm run dev
# → Open http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── context/
│   └── FinanceContext.jsx    # State management + LocalStorage persistence
├── components/
│   ├── SummaryCards.jsx      # Income / Expense / Balance cards
│   ├── TransactionForm.jsx   # Add/Edit form with validation
│   ├── TransactionList.jsx   # History log with edit/delete
│   └── ExpenseChart.jsx      # Doughnut chart (Chart.js)
├── App.jsx                   # Root layout + theme toggle
├── main.jsx                  # Entry point
└── index.css                 # Themes, responsive, glassmorphism
```

---

## ⚖️ Trade-offs & Future Improvements

### Current Shortcuts
- **LocalStorage** over IndexedDB — simpler API, sufficient for typical usage
- **No date range filtering** — shows all transactions in one list
- **No export/import** — would add CSV/JSON export with more time

### Would Improve
- Add **date range filters** and **monthly breakdown** views
- Implement **IndexedDB** for larger datasets
- Add **budget goals** per category
- Add **unit tests** with Jest + React Testing Library
- Support **multiple currencies** with conversion

---

## 📄 License

MIT
