export default function generateKeyByTitle(title = "") {
  let key = title.replace(/(\s|\W)+/g, "-").trim()
  key += "-" + Math.random().toString(36).substr(2, 6)
  return key
}