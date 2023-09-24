const requestInfo = (req, res, next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  console.log('\n* ' + (new Date()).toString().green)
  console.log('  Request method: '.gray + req.method.white)
  console.log('  Full URL: '.gray + fullUrl.cyan.underline)
  next()
}

module.exports = {
  requestInfo,
}