const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const app = express()

const colors = require('colors')

const { requestInfo } = require('./middlewares/normalMiddleware')
const { errorHandler } = require('./middlewares/errorMiddleware')
const connetDB = require('./config/db')

app.listen(port, () => {
  console.log('\n\n-----------------------------------------------------------')
  console.log(`Server is listening on port ${port}`)
})

connetDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(requestInfo)

app.use('/api/project', require('./routes/projectRoutes'))
app.use('/api/user', require('./routes/userRoutes'))


app.use(errorHandler)





