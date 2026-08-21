export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(amount, decimals = 2) {
  if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) return '0';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatInteger(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) return '0';
  
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return '-';
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  } catch (e) {
    return '-';
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return '-';
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  } catch (e) {
    return '-';
  }
}
