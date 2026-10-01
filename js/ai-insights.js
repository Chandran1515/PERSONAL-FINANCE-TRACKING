/* ==========================================================================
   WealthRise - AI Financial Health & Advisor Engine
   ========================================================================== */

function calculateFinancialHealthScore() {
  const totals = store.getTotals();
  let score = 0;
  const insights = [];

  // 1. Savings Rate Check (Max 25 pts)
  const savingsRate = parseFloat(totals.savingsRate);
  if (savingsRate >= 30) {
    score += 25;
    insights.push({ type: 'success', text: `Outstanding savings rate of ${savingsRate}%! You're saving well above the 20% benchmark.` });
  } else if (savingsRate >= 15) {
    score += 18;
    insights.push({ type: 'info', text: `Good savings rate of ${savingsRate}%. Consider cutting minor discretionary spending to reach 25%+` });
  } else if (savingsRate > 0) {
    score += 10;
    insights.push({ type: 'warning', text: `Low savings rate (${savingsRate}%). Review subscription costs and dining out.` });
  } else {
    insights.push({ type: 'danger', text: `Negative cash flow! Your expenses exceed your monthly income.` });
  }

  // 2. Positive Cashflow Check (Max 20 pts)
  if (totals.cashflow > 0) {
    score += 20;
  }

  // 3. Emergency Fund Runway Check (Max 20 pts)
  const emergencyFund = store.data.goals.find(g => g.title.toLowerCase().includes('emergency'))?.currentAmount || 0;
  const monthlyExpense = totals.expense || 1;
  const monthsCovered = (emergencyFund / monthlyExpense).toFixed(1);

  if (monthsCovered >= 6) {
    score += 20;
    insights.push({ type: 'success', text: `Emergency fund covers ${monthsCovered} months of expenses. Excellent financial safety net!` });
  } else if (monthsCovered >= 3) {
    score += 14;
    insights.push({ type: 'info', text: `Emergency reserve covers ${monthsCovered} months. Aim for 6 months for complete stability.` });
  } else {
    score += 5;
    insights.push({ type: 'warning', text: `Emergency fund only covers ${monthsCovered} months. Prioritize emergency savings.` });
  }

  // 4. Budget Compliance Check (Max 20 pts)
  const expenses = store.data.transactions.filter(t => t.type === 'expense');
  const spentMap = {};
  expenses.forEach(t => spentMap[t.category] = (spentMap[t.category] || 0) + t.amount);

  let overBudgetCount = 0;
  store.data.budgets.forEach(b => {
    if ((spentMap[b.category] || 0) > b.cap) overBudgetCount++;
  });

  if (overBudgetCount === 0) {
    score += 20;
    insights.push({ type: 'success', text: `All category budgets are currently under control!` });
  } else {
    score += Math.max(0, 20 - (overBudgetCount * 7));
    insights.push({ type: 'warning', text: `${overBudgetCount} budget categories have exceeded their monthly cap.` });
  }

  // 5. Investment Allocation (Max 15 pts)
  if (totals.investments > 0) {
    const investRatio = ((totals.investments / (totals.netWorth || 1)) * 100).toFixed(0);
    score += 15;
    insights.push({ type: 'success', text: `${investRatio}% of your net worth is actively invested in growth assets.` });
  } else {
    insights.push({ type: 'info', text: `Start investing in low-cost index funds (e.g. S&P 500) to build long-term wealth.` });
  }

  return { score: Math.min(100, score), insights };
}

function renderAIInsights() {
  const scoreBadgeEl = document.getElementById('healthScoreVal');
  const scoreGaugeBar = document.getElementById('healthScoreGauge');
  const insightsListContainer = document.getElementById('aiInsightsList');

  const { score, insights } = calculateFinancialHealthScore();

  if (scoreBadgeEl) scoreBadgeEl.textContent = score;
  if (scoreGaugeBar) {
    scoreGaugeBar.style.width = `${score}%`;
    if (score >= 80) scoreGaugeBar.className = 'progress-bar-fill bg-emerald';
    else if (score >= 60) scoreGaugeBar.className = 'progress-bar-fill bg-cyan';
    else scoreGaugeBar.className = 'progress-bar-fill bg-rose';
  }

  if (insightsListContainer) {
    insightsListContainer.innerHTML = insights.map(i => {
      let icon = 'fa-circle-info';
      let borderClass = 'var(--accent-cyan)';

      if (i.type === 'success') { icon = 'fa-circle-check'; borderClass = 'var(--primary-emerald)'; }
      else if (i.type === 'warning') { icon = 'fa-triangle-exclamation'; borderClass = 'var(--accent-amber)'; }
      else if (i.type === 'danger') { icon = 'fa-circle-xmark'; borderClass = 'var(--accent-rose)'; }

      return `
        <div class="glass-card" style="border-left: 4px solid ${borderClass}; display: flex; align-items: flex-start; gap: 0.8rem; padding: 1rem;">
          <i class="fa-solid ${icon}" style="color: ${borderClass}; font-size: 1.2rem; margin-top: 0.2rem;"></i>
          <div style="font-size: 0.92rem; font-weight: 500;">${i.text}</div>
        </div>
      `;
    }).join('');
  }
}
