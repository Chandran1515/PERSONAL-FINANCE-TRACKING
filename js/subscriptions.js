/* ==========================================================================
   WealthRise - Subscriptions & Recurring Bills Module
   ========================================================================== */

function renderSubscriptions() {
  const container = document.getElementById('subscriptionsGridContainer');
  if (!container) return;

  let totalMonthlyCost = 0;

  const html = store.data.subscriptions.map(s => {
    const monthlyCost = s.billingCycle === 'Yearly' ? (s.cost / 12) : s.cost;
    totalMonthlyCost += monthlyCost;

    return `
      <div class="glass-card budget-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="font-size: 1.8rem;">${s.icon || '💳'}</div>
            <div>
              <div style="font-weight: 700; font-size: 1.05rem;">${s.name}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${s.category}</div>
            </div>
          </div>
          <button class="btn-icon" onclick="deleteSubHandler('${s.id}')" title="Cancel Subscription">
            <i class="fa-solid fa-xmark" style="color: var(--accent-rose);"></i>
          </button>
        </div>

        <div style="margin-top: 0.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-size: 1.4rem; font-weight: 800; color: var(--primary-emerald);">
              ${store.formatMoney(s.cost)}
            </span>
            <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">
              /${s.billingCycle.toLowerCase()}
            </span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">
            <i class="fa-regular fa-calendar-check"></i> Renews: ${s.nextRenewal}
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html || `
    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
      No recurring subscriptions active.
    </div>
  `;

  // Update headers
  const monthlyTotalEl = document.getElementById('subMonthlyTotal');
  const yearlyTotalEl = document.getElementById('subYearlyTotal');

  if (monthlyTotalEl) monthlyTotalEl.textContent = store.formatMoney(totalMonthlyCost);
  if (yearlyTotalEl) yearlyTotalEl.textContent = store.formatMoney(totalMonthlyCost * 12);
}

function deleteSubHandler(id) {
  if (confirm('Cancel and remove this subscription tracker?')) {
    store.deleteSubscription(id);
    renderSubscriptions();
    refreshAppUI();
    showToast('Subscription removed');
  }
}

function handleAddSubscriptionForm(e) {
  e.preventDefault();
  const name = document.getElementById('subName').value.trim();
  const cost = parseFloat(document.getElementById('subCost').value);
  const billingCycle = document.getElementById('subCycle').value;
  const nextRenewal = document.getElementById('subRenewalDate').value;
  const category = document.getElementById('subCategory').value;
  const icon = document.getElementById('subIcon').value || '💳';

  if (!name || isNaN(cost) || cost <= 0) {
    alert('Please enter valid subscription details.');
    return;
  }

  store.addSubscription({
    name,
    cost,
    billingCycle,
    nextRenewal: nextRenewal || new Date().toISOString().split('T')[0],
    category,
    icon
  });

  closeModal('addSubscriptionModal');
  e.target.reset();
  renderSubscriptions();
  refreshAppUI();
  showToast('New subscription tracked!');
}
