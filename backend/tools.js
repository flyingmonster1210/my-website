const isEmpty = (obj, keys) => {
  if (Object.keys(obj).length === 0) {
    return true
  }

  if (keys.length === 0) {
    return false
  }

  for (let i = 0; i < keys.length; i++) {
    if (!(keys[i] in obj)) {
      return true
    }
  }

  return false
}

module.exports = {
  isEmpty,
}