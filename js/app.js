/* ==========================================================================
   WealthRise - Main Application Controller & Event Router
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCurrencySelector();
  bindNavigationEvents();
  bindModalEvents();
  refreshAppUI();
});

// Refresh all UI metrics across all tabs
function refreshAppUI() {
  renderKPICards();
  renderAllCharts();
  renderTransactionsTable();
  renderBudgets();
  renderInvestments();
  renderSubscriptions();
  renderAIInsights();
}

// Render Header Summary Cards
function renderKPICards() {
  const totals = store.getTotals();

  const nwEl = document.getElementById('kpiNetWorth');
  const incEl = document.getElementById('kpiIncome');
  const expEl = document.getElementById('kpiExpenses');
  const savEl = document.getElementById('kpiSavingsRate');

  if (nwEl) nwEl.textContent = store.formatMoney(totals.netWorth);
  if (incEl) incEl.textContent = store.formatMoney(totals.income);
  if (expEl) expEl.textContent = store.formatMoney(totals.expense);
  if (savEl) savEl.textContent = `${totals.savingsRate}%`;
}

// Navigation & Tab Switching
function bindNavigationEvents() {
  const navItems = document.querySelectorAll('.nav-item button');
  navItems.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabTarget = btn.getAttribute('data-tab');
      if (!tabTarget) return;

      // Update active nav state
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      btn.parentElement.classList.add('active');

      // Show targeted tab section
      document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));
      const activeSection = document.getElementById(tabTarget);
      if (activeSection) {
        activeSection.classList.add('active');
        // Refresh charts if switching back to dashboard or analytics
        if (tabTarget === 'tab-dashboard' || tabTarget === 'tab-investments') {
          setTimeout(renderAllCharts, 50);
        }
      }
    });
  });
}

// Theme Engine (Dark / Light toggle)
function initTheme() {
  const currentTheme = store.data.theme || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      store.data.theme = newTheme;
      store.saveState();
      updateThemeIcon(newTheme);
      renderAllCharts();
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

// Currency Selector Handler
function initCurrencySelector() {
  const select = document.getElementById('currencySelector');
  if (!select) return;

  select.value = store.data.currency || 'USD';
  select.addEventListener('change', (e) => {
    store.data.currency = e.target.value;
    store.saveState();
    refreshAppUI();
    showToast(`Currency set to ${store.getCurrencySymbol()} (${e.target.value})`);
  });
}

// Modal System Handlers
function bindModalEvents() {
  // Quick Add Transaction Form Submit
  const addTxForm = document.getElementById('addTransactionForm');
  if (addTxForm) addTxForm.addEventListener('submit', handleAddTransactionForm);

  // Goal Form Submit
  const addGoalForm = document.getElementById('addGoalForm');
  if (addGoalForm) addGoalForm.addEventListener('submit', handleAddGoalForm);

  // Investment Form Submit
  const addInvForm = document.getElementById('addInvestmentForm');
  if (addInvForm) addInvForm.addEventListener('submit', handleAddInvestmentForm);

  // Subscription Form Submit
  const addSubForm = document.getElementById('addSubscriptionForm');
  if (addSubForm) addSubForm.addEventListener('submit', handleAddSubscriptionForm);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// Toast Notification Banner
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check" style="color: var(--primary-emerald);"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Data Settings & System Control Actions
function resetDemoDataHandler() {
  if (confirm('Reset financial tracker with original demo data? Current edits will be replaced.')) {
    store.resetToDefault();
    refreshAppUI();
    showToast('State reset to sample data!');
  }
}

function exportFullJSONData() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(store.data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `WealthRise_Full_Backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Full JSON backup downloaded!');
}

function importJSONDataHandler(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.transactions && parsed.budgets) {
        store.data = parsed;
        store.saveState();
        refreshAppUI();
        showToast('JSON Backup restored successfully!');
      } else {
        alert('Invalid backup file format.');
      }
    } catch (err) {
      alert('Error parsing JSON backup file.');
    }
  };
  reader.readAsText(file);
}
