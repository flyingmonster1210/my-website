const mongoose = require('mongoose')

const connetDB = async () => {
  try {
    // If you have any special characters in the URI (or password), make sure they are encoded.
    // https://www.w3schools.com/tags/ref_urlencode.ASP
    const conn = await mongoose.connect(process.env.MONGODB_URI, { dbName: 'my-website' })

    console.log(`MongoDB conected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connetDB





