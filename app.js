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

app.use(express.static(path.join(__dirname, 'public')));

app.all('/web/**', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/v1', require('./src/components/v1'))

// test
const userDal = require('./src/components/v1/users/userDAL')
userDal.getAllUsers();

const redis = require('./src/repositories').db.cache.redis
redis.set('foo', 'bar')

redis.get('foo').then(function (data) {
  console.log(data);
});

redis.get('noex').then(function (data) {
  console.log(data);
});
// test

console.log('running...')

module.exports = app
