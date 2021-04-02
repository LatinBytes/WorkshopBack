'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const errorHandler = require('./src/utils/errorHandler')
const path = require('path')

process.on('uncaughtException', errorHandler.handleFatalError)
process.on('unhandledRejection', errorHandler.handleFatalError)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./src/middleware/discord'))


app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/login', express.static(path.join(__dirname, 'public')))

app.use('/v1', require('./src/components/v1'))


// test
const userDal = require('./src/components/v1/users/userDAL')
userDal.getAllUsers();

console.log('running...')

module.exports = app
