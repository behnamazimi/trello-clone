// to concat string and make classNames
export default function cx(...classes) {
  return classes.reduce((acc, item) => {
    if (item && typeof item === "string")
      acc += item + " "
    return acc
  }, "").trim()
}