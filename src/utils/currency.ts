export function formatCurrency(value: string | number) {
  if (typeof value === 'string') {
    value = Number(value)
  }
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}
