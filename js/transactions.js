/* ==========================================================================
   WealthRise - Transactions Management Module
   ========================================================================== */

let currentPage = 1;
const itemsPerPage = 8;

function renderTransactionsTable() {
  const container = document.getElementById('transactionsTableBody');
  if (!container) return;

  const searchInput = document.getElementById('searchTxInput')?.value.toLowerCase() || '';
  const typeFilter = document.getElementById('filterTxType')?.value || 'all';
  const categoryFilter = document.getElementById('filterTxCategory')?.value || 'all';

  let filtered = store.data.transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchInput) ||
                          t.category.toLowerCase().includes(searchInput) ||
                          (t.note && t.note.toLowerCase().includes(searchInput));
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Pagination logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

  if (paginated.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <i class="fa-solid fa-receipt" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
          No transactions found matching criteria.
        </td>
      </tr>
    `;
    updatePaginationControls(0, totalPages);
    return;
  }

  container.innerHTML = paginated.map(t => {
    const isIncome = t.type === 'income';
    const isInvestment = t.type === 'investment';
    const typeClass = isIncome ? 'type-income' : (isInvestment ? 'type-investment' : 'type-expense');
    const sign = isIncome ? '+' : (isInvestment ? '↗' : '-');

    return `
      <tr>
        <td style="font-weight: 600;">${t.date}</td>
        <td>
          <div style="font-weight: 600;">${t.description}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${t.note || ''}</div>
        </td>
        <td><span class="cat-tag">${t.category}</span></td>
        <td><span style="font-size: 0.82rem; color: var(--text-muted);"><i class="fa-solid fa-credit-card"></i> ${t.method || 'Cash'}</span></td>
        <td style="font-weight: 700;" class="${typeClass}">
          ${sign} ${store.formatMoney(t.amount)}
        </td>
        <td style="text-align: right;">
          <button class="btn-icon" onclick="deleteTxHandler('${t.id}')" title="Delete">
            <i class="fa-solid fa-trash-can" style="color: var(--accent-rose); font-size: 0.85rem;"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  updatePaginationControls(totalItems, totalPages);
  populateCategoryDropdown();
  renderQuickRecentActivity();
}

function renderQuickRecentActivity() {
  const container = document.getElementById('quickRecentTxBody');
  if (!container) return;

  const recent = store.data.transactions.slice(0, 5);
  if (recent.length === 0) {
    container.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No recent transactions.</td></tr>`;
    return;
  }

  container.innerHTML = recent.map(t => {
    const isIncome = t.type === 'income';
    const isInvestment = t.type === 'investment';
    const typeClass = isIncome ? 'type-income' : (isInvestment ? 'type-investment' : 'type-expense');
    const sign = isIncome ? '+' : (isInvestment ? '↗' : '-');

    return `
      <tr>
        <td style="font-size: 0.82rem;">${t.date}</td>
        <td style="font-weight: 600;">${t.description}</td>
        <td><span class="cat-tag">${t.category}</span></td>
        <td style="font-weight: 700;" class="${typeClass}">${sign} ${store.formatMoney(t.amount)}</td>
      </tr>
    `;
  }).join('');
}

function updatePaginationControls(totalItems, totalPages) {
  const pageInfo = document.getElementById('pageInfo');
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');

  if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages} (${totalItems} items)`;
  if (prevBtn) prevBtn.disabled = currentPage <= 1;
  if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTransactionsTable();
  }
}

function nextPage() {
  currentPage++;
  renderTransactionsTable();
}

function deleteTxHandler(id) {
  if (confirm('Are you sure you want to delete this transaction?')) {
    store.deleteTransaction(id);
    renderTransactionsTable();
    refreshAppUI();
    showToast('Transaction deleted');
  }
}

function populateCategoryDropdown() {
  const select = document.getElementById('filterTxCategory');
  if (!select) return;

  const categories = [...new Set(store.data.transactions.map(t => t.category))];
  const currentVal = select.value;

  select.innerHTML = `<option value="all">All Categories</option>` +
    categories.map(c => `<option value="${c}" ${c === currentVal ? 'selected' : ''}>${c}</option>`).join('');
}

// Add New Transaction Modal Submission
function handleAddTransactionForm(e) {
  e.preventDefault();
  const description = document.getElementById('txDescription').value.trim();
  const amount = parseFloat(document.getElementById('txAmount').value);
  const type = document.getElementById('txType').value;
  const category = document.getElementById('txCategory').value.trim();
  const date = document.getElementById('txDate').value || new Date().toISOString().split('T')[0];
  const method = document.getElementById('txMethod').value;
  const note = document.getElementById('txNote').value.trim();

  if (!description || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid description and positive amount.');
    return;
  }

  store.addTransaction({
    description,
    amount,
    type,
    category,
    date,
    method,
    note
  });

  closeModal('addTransactionModal');
  e.target.reset();
  renderTransactionsTable();
  refreshAppUI();
  showToast('New transaction added successfully!');
}

// Export Transactions to CSV File
function exportTransactionsCSV() {
  const headers = ['ID', 'Date', 'Description', 'Amount', 'Type', 'Category', 'Payment Method', 'Note'];
  const rows = store.data.transactions.map(t => [
    t.id,
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.amount,
    t.type,
    `"${t.category.replace(/"/g, '""')}"`,
    `"${t.method || 'Cash'}"`,
    `"${(t.note || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `WealthRise_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Exported CSV file successfully!');
}
