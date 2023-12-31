const keysNotFound = (obj, keys) => {
  if (obj === undefined || obj === null) {
    return {
      result: true,
      message: 'The obj is null or undefined.'
    }
  }

  if (Object.keys(obj).length === 0) {
    return {
      result: true,
      message: 'The obj is empty.'
    }
  }

  if (keys.length === 0) {
    return {
      result: false,
      message: 'The keys array is empty.'
    }
  }

  for (let i = 0; i < keys.length; i++) {
    if (!(keys[i] in obj)) {
      return {
        result: true,
        message: 'The obj does not contain the require field (' + keys[i] + ').'
      }
    }
  }

  return {
    result: false,
    message: 'The obj is not empty and it contains the required field(s).'
  }
}

module.exports = {
  keysNotFound,
}