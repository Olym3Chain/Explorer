export function formatAddress(address: string, length = 8): string {
  if (address.length <= length) return address;
  return `${address.slice(0, length)}...${address.slice(-4)}`;
}

export function formatHash(hash: string, length = 8): string {
  if (hash.length <= length) return hash;
  return `${hash.slice(0, length)}...${hash.slice(-4)}`;
}

export function formatTime(timestamp: Date | string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
}

export function formatNumber(num: number | string): string {
  const number = typeof num === 'string' ? parseFloat(num) : num;
  return new Intl.NumberFormat('en-US').format(number);
}

export function formatCurrency(amount: number | string, currency = 'USD'): string {
  const number = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(number);
}

export function formatOLM(amount: number | string): string {
  const number = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${number.toFixed(6)} OLM`;
}
