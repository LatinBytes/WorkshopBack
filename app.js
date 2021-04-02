'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
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

app.use('/login', express.static(path.join(__dirname, 'public')))
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/discord', require('./src/components/discord/discord'));
//

process.on('uncaughtException', errorHandler.handleFatalError)
process.on('unhandledRejection', errorHandler.handleFatalError)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log('running...')

module.exports = app
