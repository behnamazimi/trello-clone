export default function parseDateTimestamp(ts) {
  const date = new Date(ts || null)
  return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}