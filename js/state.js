/* ==========================================================================
   WealthRise - State Management & Storage Engine
   ========================================================================== */

const STORAGE_KEY = 'wealthrise_financial_store_v4';

// Supported Currencies Configuration
const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', name: 'US Dollar ($)' },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro (€)' },
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound (£)' },
  INR: { symbol: '₹', code: 'INR', name: 'Indian Rupee (₹)' },
  JPY: { symbol: '¥', code: 'JPY', name: 'Japanese Yen (¥)' },
  CAD: { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar (C$)' },
  AUD: { symbol: 'A$', code: 'AUD', name: 'Australian Dollar (A$)' }
};

// Default Realistic Sample Data for Initial Load (Formatted in INR ₹)
const DEFAULT_DATA = {
  currency: 'INR',
  theme: 'dark',
  transactions: [
    {
        "id": "tx-indus-1",
        "date": "2026-09-22",
        "description": "Policy Bazaar EMI Principal (006/006)",
        "amount": 8829.71,
        "type": "expense",
        "category": "Housing",
        "method": "Credit Card",
        "note": "IndusInd Credit Card EMI"
    },
    {
        "id": "tx-indus-2",
        "date": "2026-09-22",
        "description": "Policy Bazaar EMI Interest (006/006)",
        "amount": 117.75,
        "type": "expense",
        "category": "Utilities",
        "method": "Credit Card",
        "note": "IndusInd EMI Interest"
    },
    {
        "id": "tx-indus-3",
        "date": "2026-09-22",
        "description": "GST @ 18%",
        "amount": 21.2,
        "type": "expense",
        "category": "Utilities",
        "method": "Credit Card",
        "note": "IndusInd GST Charge"
    },
    {
        "id": "tx-indus-4",
        "date": "2026-09-03",
        "description": "BBPS Payment Received",
        "amount": 8990.0,
        "type": "income",
        "category": "Freelance",
        "method": "Bank Transfer",
        "note": "IndusInd Card Payment Credit"
    },
    {
        "id": "tx-icici-1",
        "date": "2026-09-18",
        "description": "Shree Sindoor Cafe",
        "amount": 20.0,
        "type": "expense",
        "category": "Food & Groceries",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-2",
        "date": "2026-09-17",
        "description": "Nayana Enterprises",
        "amount": 59.0,
        "type": "expense",
        "category": "Shopping",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-3",
        "date": "2026-09-17",
        "description": "Shree Sindoor Cafe",
        "amount": 20.0,
        "type": "expense",
        "category": "Food & Groceries",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-4",
        "date": "2026-09-16",
        "description": "Shree Sindoor Cafe",
        "amount": 45.0,
        "type": "expense",
        "category": "Food & Groceries",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-5",
        "date": "2026-09-15",
        "description": "Shree Sindoor Cafe",
        "amount": 30.0,
        "type": "expense",
        "category": "Food & Groceries",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-6",
        "date": "2026-09-14",
        "description": "Bishevar Sah",
        "amount": 90.0,
        "type": "expense",
        "category": "Entertainment",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-7",
        "date": "2026-09-13",
        "description": "Sri Raghavendra Fruit",
        "amount": 135.0,
        "type": "expense",
        "category": "Food & Groceries",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-8",
        "date": "2026-09-13",
        "description": "Veeraswamy S",
        "amount": 70.0,
        "type": "expense",
        "category": "Shopping",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-9",
        "date": "2026-09-13",
        "description": "Ashwini G",
        "amount": 50.0,
        "type": "expense",
        "category": "Entertainment",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-10",
        "date": "2026-09-13",
        "description": "Mr Muthu Subramani",
        "amount": 350.0,
        "type": "expense",
        "category": "Entertainment",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-11",
        "date": "2026-09-13",
        "description": "Govinda Swami Shop",
        "amount": 70.0,
        "type": "expense",
        "category": "Shopping",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-12",
        "date": "2026-09-09",
        "description": "Ram Lal",
        "amount": 25.0,
        "type": "expense",
        "category": "Entertainment",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-13",
        "date": "2026-09-06",
        "description": "Paytm",
        "amount": 6.27,
        "type": "expense",
        "category": "Utilities",
        "method": "Credit Card",
        "note": "ICICI Coral Card"
    },
    {
        "id": "tx-icici-14",
        "date": "2026-09-06",
        "description": "Sree Venkateshwara",
        "amount": 531.35,
        "type": "expense",
        "category": "Shopping",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-15",
        "date": "2026-09-05",
        "description": "Areef M",
        "amount": 150.0,
        "type": "expense",
        "category": "Entertainment",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-16",
        "date": "2026-09-05",
        "description": "AT Store",
        "amount": 86.0,
        "type": "expense",
        "category": "Shopping",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-17",
        "date": "2026-09-04",
        "description": "Shree Sindoor Cafe",
        "amount": 30.0,
        "type": "expense",
        "category": "Food & Groceries",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-18",
        "date": "2026-09-03",
        "description": "Malleshwar Garments",
        "amount": 300.0,
        "type": "expense",
        "category": "Shopping",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-19",
        "date": "2026-09-03",
        "description": "BBPS Payment Received",
        "amount": 24626.09,
        "type": "income",
        "category": "Salary",
        "method": "Bank Transfer",
        "note": "ICICI Card Payment Credit"
    },
    {
        "id": "tx-icici-20",
        "date": "2026-09-02",
        "description": "Mr Rayamon Raj A",
        "amount": 62.0,
        "type": "expense",
        "category": "Entertainment",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-21",
        "date": "2026-09-01",
        "description": "Areef M",
        "amount": 450.0,
        "type": "expense",
        "category": "Entertainment",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-icici-22",
        "date": "2026-08-28",
        "description": "Jio IN Mobile Recharge",
        "amount": 49.0,
        "type": "expense",
        "category": "Subscriptions",
        "method": "UPI",
        "note": "ICICI Coral UPI"
    },
    {
        "id": "tx-idfc-10",
        "date": "2026-09-15",
        "description": "Zomato, New Delhi",
        "amount": 410.49,
        "type": "expense",
        "category": "Food & Groceries",
        "method": "Credit Card",
        "note": "IDFC SWYP Card XXXX 9131"
    },
    {
        "id": "tx-idfc-9",
        "date": "2026-09-12",
        "description": "SBI PMOP Reversal Refund",
        "amount": 500.0,
        "type": "income",
        "category": "Investments",
        "method": "UPI",
        "note": "IDFC Reversal Refund"
    },
    {
        "id": "tx-idfc-8",
        "date": "2026-09-12",
        "description": "SBI PMOP Payment",
        "amount": 500.0,
        "type": "expense",
        "category": "Utilities",
        "method": "UPI",
        "note": "IDFC UPI CC Card XXXX 8848"
    },
    {
        "id": "tx-idfc-7",
        "date": "2026-09-08",
        "description": "Mr Raya (Paytm QR)",
        "amount": 104.0,
        "type": "expense",
        "category": "Entertainment",
        "method": "UPI",
        "note": "IDFC UPI CC Card XXXX 8848"
    },
    {
        "id": "tx-idfc-6",
        "date": "2026-09-06",
        "description": "RedBus Ticket Booking",
        "amount": 2100.0,
        "type": "expense",
        "category": "Transportation",
        "method": "UPI",
        "note": "IDFC UPI CC Card XXXX 8848"
    },
    {
        "id": "tx-idfc-5",
        "date": "2026-09-03",
        "description": "Pay to BharatPe Merchant",
        "amount": 590.0,
        "type": "expense",
        "category": "Shopping",
        "method": "UPI",
        "note": "IDFC UPI CC Card XXXX 8848"
    },
    {
        "id": "tx-idfc-4",
        "date": "2026-09-03",
        "description": "Zomato Limited, New Delhi",
        "amount": 775.33,
        "type": "expense",
        "category": "Food & Groceries",
        "method": "Credit Card",
        "note": "IDFC SWYP Card XXXX 9131"
    },
    {
        "id": "tx-idfc-3",
        "date": "2026-08-30",
        "description": "Eternal Limited (Zomato)",
        "amount": 833.25,
        "type": "expense",
        "category": "Food & Groceries",
        "method": "Credit Card",
        "note": "IDFC SWYP Card XXXX 9131"
    },
    {
        "id": "tx-idfc-2",
        "date": "2026-08-27",
        "description": "BillDesk BBPS Card Payment",
        "amount": 421.47,
        "type": "income",
        "category": "Investments",
        "method": "Bank Transfer",
        "note": "IDFC Payment Credit"
    },
    {
        "id": "tx-idfc-1",
        "date": "2026-08-25",
        "description": "Zomato Cybs, New Delhi",
        "amount": 1347.68,
        "type": "expense",
        "category": "Food & Groceries",
        "method": "Credit Card",
        "note": "IDFC SWYP Card XXXX 9131"
    }
],
  budgets: [
    { category: 'Housing', cap: 40000, period: 'Monthly' },
    { category: 'Food & Groceries', cap: 20000, period: 'Monthly' },
    { category: 'Transportation', cap: 10000, period: 'Monthly' },
    { category: 'Entertainment', cap: 12000, period: 'Monthly' },
    { category: 'Utilities', cap: 6000, period: 'Monthly' },
    { category: 'Subscriptions', cap: 3000, period: 'Monthly' },
    { category: 'Shopping', cap: 15000, period: 'Monthly' }
  ],
  goals: [],
  investments: [],
  subscriptions: []
};

// Global State Class
class Store {
  constructor() {
    this.data = this.loadState();
  }

  loadState() {
    try {
      // Clear older version keys from local storage
      ['wealthrise_financial_store_v1', 'wealthrise_financial_store_v2', 'wealthrise_financial_store_v3'].forEach(k => localStorage.removeItem(k));
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only return if it contains valid transactions array
        if (parsed && Array.isArray(parsed.transactions)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage', e);
    }
    const fresh = JSON.parse(JSON.stringify(DEFAULT_DATA));
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh)); } catch(e) {}
    return fresh;
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.saveState();
  }

  getCurrencySymbol() {
    return CURRENCIES[this.data.currency]?.symbol || '₹';
  }

  formatMoney(amount) {
    const sym = this.getCurrencySymbol();
    const isINR = this.data.currency === 'INR';
    const locale = isINR ? 'en-IN' : undefined;

    const formatted = Math.abs(amount).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${amount < 0 ? '-' : ''}${sym}${formatted}`;
  }

  // Transaction Helpers
  addTransaction(tx) {
    tx.id = 'tx-' + Date.now();
    this.data.transactions.unshift(tx);
    this.saveState();
    return tx;
  }

  deleteTransaction(id) {
    this.data.transactions = this.data.transactions.filter(t => t.id !== id);
    this.saveState();
  }

  // Budget Helpers
  setBudget(category, cap) {
    const idx = this.data.budgets.findIndex(b => b.category === category);
    if (idx >= 0) {
      this.data.budgets[idx].cap = parseFloat(cap);
    } else {
      this.data.budgets.push({ category, cap: parseFloat(cap), period: 'Monthly' });
    }
    this.saveState();
  }

  // Goal Helpers
  addGoalDeposit(goalId, amount) {
    const goal = this.data.goals.find(g => g.id === goalId);
    if (goal) {
      goal.currentAmount += parseFloat(amount);
      this.addTransaction({
        date: new Date().toISOString().split('T')[0],
        description: `Deposit to Goal: ${goal.title}`,
        amount: parseFloat(amount),
        type: 'investment',
        category: 'Savings Goal',
        method: 'Bank Transfer',
        note: 'Savings allocation'
      });
      this.saveState();
    }
  }

  addGoal(goal) {
    goal.id = 'goal-' + Date.now();
    this.data.goals.push(goal);
    this.saveState();
  }

  // Investment Helpers
  addInvestment(inv) {
    inv.id = 'inv-' + Date.now();
    this.data.investments.push(inv);
    this.saveState();
  }

  deleteInvestment(id) {
    this.data.investments = this.data.investments.filter(i => i.id !== id);
    this.saveState();
  }

  // Subscription Helpers
  addSubscription(sub) {
    sub.id = 'sub-' + Date.now();
    this.data.subscriptions.push(sub);
    this.saveState();
  }

  deleteSubscription(id) {
    this.data.subscriptions = this.data.subscriptions.filter(s => s.id !== id);
    this.saveState();
  }

  // Financial Metrics Calculations
  getTotals() {
    const income = this.data.transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = this.data.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const investments = this.data.investments
      .reduce((acc, i) => acc + (i.currentPrice * i.quantity), 0);

    const savingsGoalTotal = this.data.goals
      .reduce((acc, g) => acc + g.currentAmount, 0);

    const netWorth = investments + savingsGoalTotal + (income - expense);
    const savingsRate = income > 0 ? (((income - expense) / income) * 100).toFixed(1) : 0;

    return {
      income,
      expense,
      cashflow: income - expense,
      investments,
      netWorth,
      savingsRate
    };
  }
}

const store = new Store();
