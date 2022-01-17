export default function isJsonString(str = "") {
  try {
    JSON.parse(str)
    return true
  } catch (err) {
    return false
  }
}