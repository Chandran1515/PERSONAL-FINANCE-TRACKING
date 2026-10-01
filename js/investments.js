/* ==========================================================================
   WealthRise - Investment Portfolio & Calculator Module
   ========================================================================== */

function renderInvestments() {
  const container = document.getElementById('investmentsTableBody');
  if (!container) return;

  let totalCostBasis = 0;
  let totalCurrentVal = 0;

  const html = store.data.investments.map(inv => {
    const costBasis = inv.purchasePrice * inv.quantity;
    const currentVal = inv.currentPrice * inv.quantity;
    const pnl = currentVal - costBasis;
    const pnlPercent = costBasis > 0 ? ((pnl / costBasis) * 100).toFixed(2) : 0;
    const isProfit = pnl >= 0;

    totalCostBasis += costBasis;
    totalCurrentVal += currentVal;

    return `
      <tr>
        <td style="font-weight: 700;">
          <span style="margin-right: 0.4rem;">${inv.icon || '📈'}</span> ${inv.name}
        </td>
        <td><span class="cat-tag">${inv.category}</span></td>
        <td>${inv.quantity}</td>
        <td>${store.formatMoney(inv.purchasePrice)}</td>
        <td style="font-weight: 600;">${store.formatMoney(inv.currentPrice)}</td>
        <td style="font-weight: 700;">${store.formatMoney(currentVal)}</td>
        <td style="font-weight: 700;" class="${isProfit ? 'type-income' : 'type-expense'}">
          ${isProfit ? '+' : ''}${store.formatMoney(pnl)} (${isProfit ? '+' : ''}${pnlPercent}%)
        </td>
        <td style="text-align: right;">
          <button class="btn-icon" onclick="deleteInvHandler('${inv.id}')" title="Delete Asset">
            <i class="fa-solid fa-trash-can" style="color: var(--accent-rose); font-size: 0.85rem;"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = html || `
    <tr>
      <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);">
        No investment assets recorded yet.
      </td>
    </tr>
  `;

  // Update summary header metrics
  const portfolioValEl = document.getElementById('portfolioTotalVal');
  const portfolioPnlEl = document.getElementById('portfolioTotalPnl');

  const totalPnl = totalCurrentVal - totalCostBasis;
  const totalPnlPct = totalCostBasis > 0 ? ((totalPnl / totalCostBasis) * 100).toFixed(2) : 0;

  if (portfolioValEl) portfolioValEl.textContent = store.formatMoney(totalCurrentVal);
  if (portfolioPnlEl) {
    portfolioPnlEl.className = totalPnl >= 0 ? 'kpi-val type-income' : 'kpi-val type-expense';
    portfolioPnlEl.textContent = `${totalPnl >= 0 ? '+' : ''}${store.formatMoney(totalPnl)} (${totalPnlPct}%)`;
  }

  calculateCompoundInterest();
}

function deleteInvHandler(id) {
  if (confirm('Delete this asset from portfolio?')) {
    store.deleteInvestment(id);
    renderInvestments();
    refreshAppUI();
    showToast('Asset removed from portfolio');
  }
}

function handleAddInvestmentForm(e) {
  e.preventDefault();
  const name = document.getElementById('invName').value.trim();
  const category = document.getElementById('invCategory').value;
  const purchasePrice = parseFloat(document.getElementById('invBuyPrice').value);
  const currentPrice = parseFloat(document.getElementById('invCurrentPrice').value);
  const quantity = parseFloat(document.getElementById('invQty').value);
  const icon = document.getElementById('invIcon').value || '📈';

  if (!name || isNaN(purchasePrice) || isNaN(quantity)) {
    alert('Please enter valid asset details.');
    return;
  }

  store.addInvestment({
    name,
    category,
    purchasePrice,
    currentPrice: isNaN(currentPrice) ? purchasePrice : currentPrice,
    quantity,
    icon
  });

  closeModal('addInvestmentModal');
  e.target.reset();
  renderInvestments();
  refreshAppUI();
  showToast('Investment asset added!');
}

// Compound Interest Simulator
function calculateCompoundInterest() {
  const initial = parseFloat(document.getElementById('calcInitial')?.value) || 5000;
  const monthly = parseFloat(document.getElementById('calcMonthly')?.value) || 500;
  const rate = parseFloat(document.getElementById('calcRate')?.value) || 8;
  const years = parseInt(document.getElementById('calcYears')?.value) || 10;

  let total = initial;
  let totalContributed = initial;

  const monthlyRate = (rate / 100) / 12;
  const totalMonths = years * 12;

  for (let i = 0; i < totalMonths; i++) {
    total = (total + monthly) * (1 + monthlyRate);
    totalContributed += monthly;
  }

  const interestEarned = total - totalContributed;

  const resValEl = document.getElementById('calcFutureVal');
  const resContribEl = document.getElementById('calcTotalContrib');
  const resInterestEl = document.getElementById('calcTotalInterest');

  if (resValEl) resValEl.textContent = store.formatMoney(total);
  if (resContribEl) resContribEl.textContent = store.formatMoney(totalContributed);
  if (resInterestEl) resInterestEl.textContent = store.formatMoney(interestEarned);
}
