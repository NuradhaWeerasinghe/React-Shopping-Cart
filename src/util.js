
export default function formatCurrency(num) {
  return "LKR " + Number(num.toFixed(1)).toLocaleString() + ".00 ";
}