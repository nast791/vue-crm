export default function curFixed(value) {
  if (value !== 1) return value.toFixed(3);
  return value;
}