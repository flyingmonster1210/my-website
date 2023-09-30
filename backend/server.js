const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const app = express()


const { requestInfo } = require('./middlewares/normalMiddleware')
const { errorHandler } = require('./middlewares/errorMiddleware')
const connetDB = require('./config/db')

app.listen(port || 3000, () => {
  console.log('\n\n-----------------------------------------------------------')
  console.log(`Server is listening on port ${port}`)
})

connetDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(requestInfo)

app.use('/api/project', require('./routes/projectRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Please set to production mode'))
}

app.use(errorHandler)


