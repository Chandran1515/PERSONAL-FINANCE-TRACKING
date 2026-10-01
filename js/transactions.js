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

// Import Transactions from CSV File
function importTransactionsCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const text = e.target.result;
      const lines = text.split(/\r\n|\n/).filter(line => line.trim().length > 0);
      
      if (lines.length < 2) {
        alert('CSV file appears empty or missing rows.');
        return;
      }

      // Parse header row to map columns
      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
      
      let dateIdx = headers.findIndex(h => h.includes('date'));
      let descIdx = headers.findIndex(h => h.includes('description') || h.includes('name') || h.includes('payee') || h.includes('merchant'));
      let amountIdx = headers.findIndex(h => h.includes('amount') || h.includes('price') || h.includes('cost'));
      let typeIdx = headers.findIndex(h => h.includes('type'));
      let catIdx = headers.findIndex(h => h.includes('category'));
      let methodIdx = headers.findIndex(h => h.includes('method') || h.includes('payment'));
      let noteIdx = headers.findIndex(h => h.includes('note') || h.includes('memo'));

      // Fallbacks if header names differ
      if (dateIdx === -1) dateIdx = 0;
      if (descIdx === -1) descIdx = 1;
      if (amountIdx === -1) amountIdx = 2;

      let importedCount = 0;
      const today = new Date().toISOString().split('T')[0];

      for (let i = 1; i < lines.length; i++) {
        // Simple CSV regex row parser handling quotes
        const cols = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
        const cleanCols = cols.map(c => c.trim().replace(/^"|"$/g, ''));

        const description = cleanCols[descIdx] || 'Imported Expense';
        const rawAmount = parseFloat((cleanCols[amountIdx] || '0').replace(/[^0-9.-]+/g, ''));
        if (isNaN(rawAmount) || rawAmount === 0) continue;

        const amount = Math.abs(rawAmount);
        let type = typeIdx !== -1 ? (cleanCols[typeIdx] || '').toLowerCase() : (rawAmount < 0 ? 'expense' : 'income');
        if (!['income', 'expense', 'investment'].includes(type)) {
          type = rawAmount < 0 ? 'expense' : 'income';
        }

        const category = catIdx !== -1 && cleanCols[catIdx] ? cleanCols[catIdx] : 'General';
        const date = dateIdx !== -1 && cleanCols[dateIdx] ? cleanCols[dateIdx] : today;
        const method = methodIdx !== -1 && cleanCols[methodIdx] ? cleanCols[methodIdx] : 'Bank Transfer';
        const note = noteIdx !== -1 ? cleanCols[noteIdx] : 'Imported via CSV';

        store.addTransaction({
          description,
          amount,
          type,
          category,
          date,
          method,
          note
        });
        importedCount++;
      }

      renderTransactionsTable();
      refreshAppUI();
      showToast(`Successfully imported ${importedCount} transactions from CSV!`);
      event.target.value = '';
    } catch (err) {
      console.error('Error reading CSV:', err);
      alert('Error parsing CSV file. Please ensure it is a valid CSV spreadsheet.');
    }
  };
  reader.readAsText(file);
}
