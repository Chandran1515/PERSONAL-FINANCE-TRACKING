/* ==========================================================================
   WealthRise - Budgets & Savings Goals Module
   ========================================================================== */

function renderBudgets() {
  const container = document.getElementById('budgetGridContainer');
  if (!container) return;

  const expenses = store.data.transactions.filter(t => t.type === 'expense');
  
  // Calculate total spent per category
  const spentMap = {};
  expenses.forEach(t => {
    spentMap[t.category] = (spentMap[t.category] || 0) + t.amount;
  });

  container.innerHTML = store.data.budgets.map(b => {
    const spent = spentMap[b.category] || 0;
    const percent = Math.min(100, Math.round((spent / b.cap) * 100));
    
    let colorClass = 'bg-emerald';
    let statusBadge = `<span class="kpi-badge badge-up"><i class="fa-solid fa-check"></i> On Track</span>`;

    if (percent >= 100) {
      colorClass = 'bg-rose';
      statusBadge = `<span class="kpi-badge badge-down"><i class="fa-solid fa-triangle-exclamation"></i> Over Budget</span>`;
    } else if (percent >= 80) {
      colorClass = 'bg-amber';
      statusBadge = `<span class="kpi-badge badge-neutral"><i class="fa-solid fa-circle-exclamation"></i> Near Limit</span>`;
    }

    return `
      <div class="glass-card budget-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div style="font-weight: 700; font-size: 1.05rem;">${b.category}</div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">${b.period} Limit</div>
          </div>
          ${statusBadge}
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.3rem;">
            <span>${store.formatMoney(spent)} spent</span>
            <span style="color: var(--text-muted);">${store.formatMoney(b.cap)} cap</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill ${colorClass}" style="width: ${percent}%;"></div>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.4rem; text-align: right;">
            ${percent}% utilized
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem;">
          <button class="btn-secondary" style="padding: 0.3rem 0.7rem; font-size: 0.8rem;" onclick="openEditBudgetModal('${b.category}', ${b.cap})">
            <i class="fa-solid fa-pen-to-square"></i> Edit Cap
          </button>
        </div>
      </div>
    `;
  }).join('');

  render503020Rule();
  renderSavingsGoals();
}

// 50 / 30 / 20 Budget Rule Calculator
function render503020Rule() {
  const totals = store.getTotals();
  const income = totals.income || 5000;

  const needsTarget = income * 0.50;
  const wantsTarget = income * 0.30;
  const savingsTarget = income * 0.20;

  const needsEl = document.getElementById('ruleNeedsVal');
  const wantsEl = document.getElementById('ruleWantsVal');
  const savingsEl = document.getElementById('ruleSavingsVal');

  if (needsEl) needsEl.textContent = store.formatMoney(needsTarget);
  if (wantsEl) wantsEl.textContent = store.formatMoney(wantsTarget);
  if (savingsEl) savingsEl.textContent = store.formatMoney(savingsTarget);
}

// Savings Goals Cards
function renderSavingsGoals() {
  const container = document.getElementById('goalsGridContainer');
  if (!container) return;

  container.innerHTML = store.data.goals.map(g => {
    const percent = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
    const remaining = Math.max(0, g.targetAmount - g.currentAmount);

    return `
      <div class="glass-card budget-card">
        <div class="goal-card-top">
          <div class="goal-icon">${g.icon}</div>
          <div>
            <div style="font-weight: 700; font-size: 1.1rem;">${g.title}</div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">Target: ${g.targetDate}</div>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 700; margin-bottom: 0.3rem;">
            <span style="color: var(--primary-emerald);">${store.formatMoney(g.currentAmount)}</span>
            <span style="color: var(--text-muted);">${store.formatMoney(g.targetAmount)}</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill bg-cyan" style="width: ${percent}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted); margin-top: 0.4rem;">
            <span>${percent}% achieved</span>
            <span>${store.formatMoney(remaining)} needed</span>
          </div>
        </div>

        <button class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.88rem; margin-top: 0.5rem;" onclick="promptGoalDeposit('${g.id}', '${g.title}')">
          <i class="fa-solid fa-piggy-bank"></i> + Deposit Funds
        </button>
      </div>
    `;
  }).join('');
}

function promptGoalDeposit(goalId, title) {
  const amountStr = prompt(`Deposit funds towards "${title}":`, '250');
  if (amountStr && !isNaN(parseFloat(amountStr)) && parseFloat(amountStr) > 0) {
    store.addGoalDeposit(goalId, parseFloat(amountStr));
    renderBudgets();
    refreshAppUI();
    showToast(`Added deposit to ${title}!`);
  }
}

function openEditBudgetModal(category, currentCap) {
  const newCap = prompt(`Set new monthly budget cap for ${category}:`, currentCap);
  if (newCap && !isNaN(parseFloat(newCap)) && parseFloat(newCap) > 0) {
    store.setBudget(category, parseFloat(newCap));
    renderBudgets();
    refreshAppUI();
    showToast(`Updated ${category} budget cap to ${store.formatMoney(parseFloat(newCap))}`);
  }
}

function handleAddGoalForm(e) {
  e.preventDefault();
  const title = document.getElementById('goalTitle').value.trim();
  const targetAmount = parseFloat(document.getElementById('goalTarget').value);
  const currentAmount = parseFloat(document.getElementById('goalCurrent').value) || 0;
  const icon = document.getElementById('goalIcon').value || '🎯';
  const targetDate = document.getElementById('goalDate').value;

  if (!title || isNaN(targetAmount) || targetAmount <= 0) {
    alert('Please enter valid goal details.');
    return;
  }

  store.addGoal({
    title,
    targetAmount,
    currentAmount,
    icon,
    targetDate
  });

  closeModal('addGoalModal');
  e.target.reset();
  renderBudgets();
  refreshAppUI();
  showToast('New savings goal created!');
}
