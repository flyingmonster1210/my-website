const requestInfo = (req, res, next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  console.log('\n* ' + (new Date()).toString())
  console.log(`  Request method: ${req.method}`)
  console.log('  Full URL: ' + fullUrl.cyan.underline)
  next()
}

module.exports = {
  requestInfo,
}