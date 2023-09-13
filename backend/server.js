const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const app = express()

const { requestInfo } = require('./middlewares/normalMiddleware')
const { errorHandler } = require('./middlewares/errorMiddleware')

app.listen(port, () => {
  console.log('\n\n-----------------------------------------------------------')
  console.log(`Server is listening on port ${port}`)
})

app.use(requestInfo)

app.use('/api/project', require('./routes/projectRoutes'))
app.use('/api/user', require('./routes/userRoutes'))


app.use(errorHandler)





