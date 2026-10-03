/* ==========================================================================
   WealthRise - Chart.js Visualization Engine
   ========================================================================== */

let netWorthChartInstance = null;
let categoryChartInstance = null;
let cashflowChartInstance = null;
let assetChartInstance = null;

// Chart Color Palettes
const CHART_COLORS = {
  emerald: '#10b981',
  cyan: '#06b6d4',
  purple: '#8b5cf6',
  amber: '#f59e0b',
  rose: '#f43f5e',
  blue: '#3b82f6',
  indigo: '#6366f1',
  pink: '#ec4899'
};

function getThemeTextColors() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  return {
    textColor: isDark ? '#9ca3af' : '#475569',
    gridColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'
  };
}

// 1. Net Worth Trend Chart (Line Chart)
function renderNetWorthChart() {
  const ctx = document.getElementById('netWorthChart')?.getContext('2d');
  if (!ctx) return;

  if (netWorthChartInstance) {
    netWorthChartInstance.destroy();
  }

  const { textColor, gridColor } = getThemeTextColors();

  // Generate historical net worth data points dynamically
  const totals = store.getTotals();
  const currentNW = totals.netWorth;
  const labels = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct (Current)'];
  
  // Calculate data points safely
  let base = Math.max(currentNW, 0);
  const dataPoints = currentNW === 0 
    ? [0, 0, 0, 0, 0, 0] 
    : [base * 0.2, base * 0.4, base * 0.6, base * 0.75, base * 0.9, currentNW];

  const gradient = ctx.createLinearGradient(0, 0, 0, 250);
  gradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
  gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  netWorthChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Net Worth Trend',
        data: dataPoints,
        borderColor: CHART_COLORS.emerald,
        borderWidth: 3,
        backgroundColor: gradient,
        fill: true,
        tension: 0.38,
        pointBackgroundColor: CHART_COLORS.emerald,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${store.formatMoney(ctx.raw)}`
          }
        }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor } },
        y: { 
          grid: { color: gridColor }, 
          ticks: { 
            color: textColor,
            callback: (value) => store.getCurrencySymbol() + (value >= 1000 ? (value / 1000).toFixed(1) + 'k' : Math.round(value))
          } 
        }
      }
    }
  });
}

// 2. Expense Category Breakdown (Donut Chart)
function renderCategoryExpenseChart() {
  const ctx = document.getElementById('categoryChart')?.getContext('2d');
  if (!ctx) return;

  if (categoryChartInstance) {
    categoryChartInstance.destroy();
  }

  const { textColor } = getThemeTextColors();

  // Aggregate expenses by category
  const expenses = store.data.transactions.filter(t => t.type === 'expense');
  const catMap = {};
  expenses.forEach(t => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount;
  });

  const labels = Object.keys(catMap);
  const data = Object.values(catMap);
  const bgColors = [
    CHART_COLORS.rose,
    CHART_COLORS.amber,
    CHART_COLORS.cyan,
    CHART_COLORS.purple,
    CHART_COLORS.emerald,
    CHART_COLORS.blue,
    CHART_COLORS.pink
  ];

  categoryChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels.length ? labels : ['No Expenses'],
      datasets: [{
        data: data.length ? data : [1],
        backgroundColor: bgColors.slice(0, Math.max(labels.length, 1)),
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: textColor, font: { family: 'Inter', size: 12 } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${store.formatMoney(ctx.raw)}`
          }
        }
      },
      cutout: '72%'
    }
  });
}

// 3. Cashflow Income vs Expense (Bar Chart)
function renderCashflowChart() {
  const ctx = document.getElementById('cashflowChart')?.getContext('2d');
  if (!ctx) return;

  if (cashflowChartInstance) {
    cashflowChartInstance.destroy();
  }

  const { textColor, gridColor } = getThemeTextColors();
  const totals = store.getTotals();

  cashflowChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jul', 'Aug', 'Sep (Current)'],
      datasets: [
        {
          label: 'Income',
          data: [5800, 6100, totals.income],
          backgroundColor: CHART_COLORS.emerald,
          borderRadius: 6
        },
        {
          label: 'Expenses',
          data: [2900, 3100, totals.expense],
          backgroundColor: CHART_COLORS.rose,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: textColor } },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${store.formatMoney(ctx.raw)}`
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: textColor } },
        y: { 
          grid: { color: gridColor }, 
          ticks: { 
            color: textColor,
            callback: (val) => store.getCurrencySymbol() + val 
          } 
        }
      }
    }
  });
}

// 4. Asset Allocation Chart
function renderAssetAllocationChart() {
  const ctx = document.getElementById('assetChart')?.getContext('2d');
  if (!ctx) return;

  if (assetChartInstance) {
    assetChartInstance.destroy();
  }

  const { textColor } = getThemeTextColors();

  const assetMap = {};
  store.data.investments.forEach(inv => {
    const val = inv.currentPrice * inv.quantity;
    assetMap[inv.category] = (assetMap[inv.category] || 0) + val;
  });

  const labels = Object.keys(assetMap);
  const data = Object.values(assetMap);

  assetChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          CHART_COLORS.cyan,
          CHART_COLORS.purple,
          CHART_COLORS.amber,
          CHART_COLORS.emerald,
          CHART_COLORS.blue
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor } },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${store.formatMoney(ctx.raw)}`
          }
        }
      }
    }
  });
}

// Refresh all charts on theme toggle or data updates
function renderAllCharts() {
  renderNetWorthChart();
  renderCategoryExpenseChart();
  renderCashflowChart();
  renderAssetAllocationChart();
}
