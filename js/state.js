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

// Default Realistic Sample Data for Initial Load (Formatted in INR ₹)
const DEFAULT_DATA = {
  currency: 'INR',
  theme: 'dark',
  transactions: [
    { id: 'tx-1', date: '2026-09-28', description: 'Tech Corp Salary', amount: 150000.00, type: 'income', category: 'Salary', method: 'Bank Transfer', note: 'Monthly HDFC salary credit' },
    { id: 'tx-2', date: '2026-09-27', description: 'Apartment Rent', amount: 35000.00, type: 'expense', category: 'Housing', method: 'Bank Transfer', note: 'September rent payment' },
    { id: 'tx-3', date: '2026-09-25', description: 'DMart & Groceries', amount: 14500.00, type: 'expense', category: 'Food & Groceries', method: 'UPI', note: 'Monthly family grocery run' },
    { id: 'tx-4', date: '2026-09-24', description: 'Freelance Tech Consulting', amount: 45000.00, type: 'income', category: 'Freelance', method: 'Bank Transfer', note: 'Web App Consulting' },
    { id: 'tx-5', date: '2026-09-22', description: 'Nifty 50 Index Fund SIP', amount: 25000.00, type: 'investment', category: 'Stocks & ETFs', method: 'Auto-Debit', note: 'Monthly Index SIP' },
    { id: 'tx-6', date: '2026-09-20', description: 'Electricity & Utility Bill', amount: 3850.00, type: 'expense', category: 'Utilities', method: 'UPI', note: 'Monthly electricity bill' },
    { id: 'tx-7', date: '2026-09-18', description: 'Indian Oil Fuel Refill', amount: 4500.00, type: 'expense', category: 'Transportation', method: 'Credit Card', note: 'Car petrol tank full' },
    { id: 'tx-8', date: '2026-09-15', description: 'Weekend Dinner Outing', amount: 4200.00, type: 'expense', category: 'Entertainment', method: 'Credit Card', note: 'Family weekend dinner' },
    { id: 'tx-9', date: '2026-09-12', description: 'Netflix & Broadband', amount: 1499.00, type: 'expense', category: 'Subscriptions', method: 'UPI', note: 'Fiber net + Netflix' },
    { id: 'tx-10', date: '2026-09-10', description: 'Gym Membership', amount: 3500.00, type: 'expense', category: 'Healthcare', method: 'UPI', note: 'Monthly gym fee' },
    { id: 'tx-11', date: '2026-09-05', description: 'Digital Gold SIP', amount: 10000.00, type: 'investment', category: 'Gold', method: 'UPI', note: 'Digital Gold DCA' },
    { id: 'tx-12', date: '2026-09-01', description: 'TCS Dividend Payout', amount: 8500.00, type: 'income', category: 'Investments', method: 'Bank Transfer', note: 'Quarterly dividend' }
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
  goals: [
    { id: 'goal-1', title: '6-Month Emergency Reserve', targetAmount: 600000, currentAmount: 480000, icon: '🛡️', targetDate: '2027-04-01' },
    { id: 'goal-2', title: 'Vacation to Ladakh & Kashmir', targetAmount: 150000, currentAmount: 95000, icon: '✈️', targetDate: '2027-08-15' },
    { id: 'goal-3', title: 'Home Downpayment Fund', targetAmount: 1500000, currentAmount: 750000, icon: '🏡', targetDate: '2028-12-31' }
  ],
  investments: [
    { id: 'inv-1', name: 'UTI Nifty 50 Index Fund', category: 'Stocks & ETFs', purchasePrice: 120.50, currentPrice: 165.40, quantity: 2500, icon: '📈' },
    { id: 'inv-2', name: 'Reliance Industries (RELIANCE)', category: 'Stocks & ETFs', purchasePrice: 2450.00, currentPrice: 2980.00, quantity: 100, icon: '🏭' },
    { id: 'inv-3', name: 'Tata Consultancy Services (TCS)', category: 'Stocks & ETFs', purchasePrice: 3500.00, currentPrice: 4250.00, quantity: 50, icon: '💻' },
    { id: 'inv-4', name: 'SBI Fixed Deposit (7.1%)', category: 'Cash & HYSA', purchasePrice: 1.00, currentPrice: 1.00, quantity: 500000, icon: '🏦' },
    { id: 'inv-5', name: 'Sovereign Gold Bond (SGB)', category: 'Gold', purchasePrice: 5200.00, currentPrice: 7150.00, quantity: 50, icon: '🪙' }
  ],
  subscriptions: [
    { id: 'sub-1', name: 'Netflix Premium 4K', cost: 649.00, billingCycle: 'Monthly', nextRenewal: '2026-10-05', category: 'Entertainment', icon: '🎬' },
    { id: 'sub-2', name: 'Spotify Premium Duo', cost: 149.00, billingCycle: 'Monthly', nextRenewal: '2026-10-12', category: 'Entertainment', icon: '🎵' },
    { id: 'sub-3', name: 'YouTube Premium', cost: 149.00, billingCycle: 'Monthly', nextRenewal: '2026-10-18', category: 'Productivity', icon: '▶️' },
    { id: 'sub-4', name: 'Amazon Prime India', cost: 1499.00, billingCycle: 'Yearly', nextRenewal: '2026-11-20', category: 'Shopping', icon: '📦' },
    { id: 'sub-5', name: 'JioFiber 300Mbps', cost: 1179.00, billingCycle: 'Monthly', nextRenewal: '2026-10-28', category: 'Utilities', icon: '🌐' }
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
