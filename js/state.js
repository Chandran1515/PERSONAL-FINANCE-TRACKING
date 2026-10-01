/* ==========================================================================
   WealthRise - State Management & Storage Engine
   ========================================================================== */

const STORAGE_KEY = 'wealthrise_financial_store_v1';

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

// Default Realistic Sample Data for Initial Load
const DEFAULT_DATA = {
  currency: 'USD',
  theme: 'dark',
  transactions: [
    { id: 'tx-1', date: '2026-09-28', description: 'Tech Corp Salary', amount: 5200.00, type: 'income', category: 'Salary', method: 'Bank Transfer', note: 'Monthly payroll deposit' },
    { id: 'tx-2', date: '2026-09-27', description: 'Luxury Apartment Rent', amount: 1650.00, type: 'expense', category: 'Housing', method: 'Bank Transfer', note: 'September rent' },
    { id: 'tx-3', date: '2026-09-25', description: 'Whole Foods Grocery', amount: 185.40, type: 'expense', category: 'Food & Groceries', method: 'Credit Card', note: 'Weekly grocery run' },
    { id: 'tx-4', date: '2026-09-24', description: 'Freelance UI Design', amount: 950.00, type: 'income', category: 'Freelance', method: 'Bank Transfer', note: 'Mobile App Wireframes' },
    { id: 'tx-5', date: '2026-09-22', description: 'Vanguard S&P 500 Index (VOO)', amount: 600.00, type: 'investment', category: 'Stocks & ETFs', method: 'Bank Transfer', note: 'Monthly index DCA' },
    { id: 'tx-6', date: '2026-09-20', description: 'Electric & Water Utility', amount: 135.20, type: 'expense', category: 'Utilities', method: 'Debit Card', note: 'Monthly bill' },
    { id: 'tx-7', date: '2026-09-18', description: 'Chevron Gas Station', amount: 55.00, type: 'expense', category: 'Transportation', method: 'Credit Card', note: 'Full tank fill' },
    { id: 'tx-8', date: '2026-09-15', description: 'Dinner at Bistro Moderne', amount: 92.50, type: 'expense', category: 'Entertainment', method: 'Credit Card', note: 'Weekend dinner out' },
    { id: 'tx-9', date: '2026-09-12', description: 'Apple One Subscription', amount: 37.95, type: 'expense', category: 'Subscriptions', method: 'Credit Card', note: 'Family plan' },
    { id: 'tx-10', date: '2026-09-10', description: 'Equinox Gym Membership', amount: 240.00, type: 'expense', category: 'Healthcare', method: 'Credit Card', note: 'Monthly membership' },
    { id: 'tx-11', date: '2026-09-05', description: 'Bitcoin (BTC) Purchase', amount: 300.00, type: 'investment', category: 'Crypto', method: 'Bank Transfer', note: 'DCA Crypto allocation' },
    { id: 'tx-12', date: '2026-09-01', description: 'Dividend Payout (AAPL)', amount: 145.80, type: 'income', category: 'Investments', method: 'Bank Transfer', note: 'Quarterly dividend' }
  ],
  budgets: [
    { category: 'Housing', cap: 1700, period: 'Monthly' },
    { category: 'Food & Groceries', cap: 600, period: 'Monthly' },
    { category: 'Transportation', cap: 300, period: 'Monthly' },
    { category: 'Entertainment', cap: 350, period: 'Monthly' },
    { category: 'Utilities', cap: 250, period: 'Monthly' },
    { category: 'Subscriptions', cap: 100, period: 'Monthly' },
    { category: 'Shopping', cap: 400, period: 'Monthly' }
  ],
  goals: [
    { id: 'goal-1', title: '6-Month Emergency Reserve', targetAmount: 18000, currentAmount: 14200, icon: '🛡️', targetDate: '2027-04-01' },
    { id: 'goal-2', title: 'Vacation to Tokyo & Kyoto', targetAmount: 4500, currentAmount: 3100, icon: '✈️', targetDate: '2027-08-15' },
    { id: 'goal-3', title: 'Real Estate Downpayment', targetAmount: 50000, currentAmount: 22500, icon: '🏡', targetDate: '2028-12-31' }
  ],
  investments: [
    { id: 'inv-1', name: 'Vanguard Total Stock (VTI)', category: 'Stocks & ETFs', purchasePrice: 220.50, currentPrice: 275.40, quantity: 85, icon: '📈' },
    { id: 'inv-2', name: 'Apple Inc. (AAPL)', category: 'Stocks & ETFs', purchasePrice: 170.00, currentPrice: 228.10, quantity: 40, icon: '🍏' },
    { id: 'inv-3', name: 'Bitcoin (BTC)', category: 'Crypto', purchasePrice: 42000.00, currentPrice: 64200.00, quantity: 0.35, icon: '₿' },
    { id: 'inv-4', name: 'Ethereum (ETH)', category: 'Crypto', purchasePrice: 2400.00, currentPrice: 3450.00, quantity: 2.5, icon: '⟠' },
    { id: 'inv-5', name: 'High Yield Savings (Marcus 5.1%)', category: 'Cash & HYSA', purchasePrice: 1.00, currentPrice: 1.00, quantity: 15400, icon: '🏦' }
  ],
  subscriptions: [
    { id: 'sub-1', name: 'Netflix Premium 4K', cost: 22.99, billingCycle: 'Monthly', nextRenewal: '2026-10-05', category: 'Entertainment', icon: '🎬' },
    { id: 'sub-2', name: 'Spotify Duo', cost: 14.99, billingCycle: 'Monthly', nextRenewal: '2026-10-12', category: 'Entertainment', icon: '🎵' },
    { id: 'sub-3', name: 'ChatGPT Plus', cost: 20.00, billingCycle: 'Monthly', nextRenewal: '2026-10-18', category: 'Productivity', icon: '🤖' },
    { id: 'sub-4', name: 'Amazon Prime', cost: 139.00, billingCycle: 'Yearly', nextRenewal: '2026-11-20', category: 'Shopping', icon: '📦' },
    { id: 'sub-5', name: 'GitHub Pro', cost: 4.00, billingCycle: 'Monthly', nextRenewal: '2026-10-28', category: 'Developer Tools', icon: '💻' }
  ]
};

// Global State Class
class Store {
  constructor() {
    this.data = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_DATA, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
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
    return CURRENCIES[this.data.currency]?.symbol || '$';
  }

  formatMoney(amount) {
    const sym = this.getCurrencySymbol();
    const formatted = Math.abs(amount).toLocaleString(undefined, {
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
