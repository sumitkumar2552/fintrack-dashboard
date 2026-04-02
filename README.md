# FinTrack - Finance Dashboard

A clean, interactive finance dashboard built with **React 18**, **Tailwind CSS**, **Zustand**, and **Recharts**.

---

## Features

### Core Requirements
| Feature | Details |
|---|---|
| Dashboard Overview | Summary cards (balance, income, expenses, savings rate), area chart for 6-month balance trend, doughnut chart for spending by category |
| Transactions Section | Full list with search, filter by type/category, sort by date/amount |
| Role-Based UI | Admin can add, edit, delete transactions. Viewer gets read-only access. Switch via dropdown in the topbar. |
| Insights Section | 6 key metric cards + monthly income vs expense bar chart + top spending categories horizontal bar chart |
| State Management | Zustand store with `persist` middleware - all state survives page refresh via `localStorage` |

### Optional Enhancements
- **Dark mode** - toggle via sun/moon icon in topbar, persisted across sessions
- **Data persistence** - Zustand + localStorage, no data lost on reload
- **CSV export** - exports all transactions to `fintrack_transactions.csv`
- **Animations** - smooth fade-in on page transitions

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 | Component model, hooks, ecosystem |
| Styling | Tailwind CSS | Utility-first, responsive by default |
| State | Zustand | Simple, minimal boilerplate, built-in persistence |
| Charts | Recharts | Declarative, composable, works well with React |
| Icons | Lucide React | Clean, consistent icon set |

---

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── Topbar.jsx           # Top header (role switcher, dark mode, export)
│   ├── SummaryCard.jsx      # Reusable metric card
│   └── TransactionModal.jsx # Add / Edit transaction modal
├── context/
│   └── useStore.js          # Zustand global store
├── data/
│   └── transactions.js      # Mock data + categories list
├── pages/
│   ├── Dashboard.jsx        # Overview page
│   ├── Transactions.jsx     # Transactions list page
│   └── Insights.jsx         # Analytics / insights page
├── utils/
│   └── helpers.js           # fmt(), CHART_COLORS, exportToCSV()
├── App.jsx                  # Root component, page routing
├── index.js                 # React entry point
└── index.css                # Tailwind directives + custom utilities
```

---

## Setup & Running Locally

### Prerequisites
- Node.js v16 or above
- npm v8 or above

### Steps

```bash
# 1. Clone or unzip the project
cd fintrack-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app will open at **http://localhost:3000**


---


## Live Demo

- **Live:** https://fintrack-dashboard-seven.vercel.app/


---

## Role-Based UI

| Feature | Admin | Viewer |
|---|---|---|
| View dashboard, transactions, insights | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |
| Export CSV | ✅ | ✅ |

Switch roles using the dropdown in the topbar - no login required (frontend simulation).

---

## Assumptions

- All data is mock/static - no backend or real API calls
- Roles are simulated on the frontend for demo purposes only
- Currency is in INR (₹)
- "6 months" in charts refers to Oct 2025 - Mar 2026


---

## Author

**Sumit Kumar** - Frontend Developer Intern Assignment  
Zorvyn FinTech Pvt. Ltd.
