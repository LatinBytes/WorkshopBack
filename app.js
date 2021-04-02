'use strict'
require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const errorHandler = require('./src/utils/errorHandler')

// const db = require('./src/repositories/db')

// const eraseDatabaseOnSync = process.env.ERRASE_DB || true
// db.sql.connection.sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
//   if (eraseDatabaseOnSync) {
//     await db.sql.seeds.seeds()
//   }
// })


// demo
const path = require('path');

app.use(require('./src/middleware/discord'))

app.get('/login', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.use('/discord', require('./src/components/discord/discord'));
//

process.on('uncaughtException', errorHandler.handleFatalError)
process.on('unhandledRejection', errorHandler.handleFatalError)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log('running...')

module.exports = app
