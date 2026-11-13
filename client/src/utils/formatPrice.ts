export function formatPrice(price: number): string {
  if (price === 0) {
    return "$0.00";
  }
  return `$${price.toFixed(2)}`;
}

