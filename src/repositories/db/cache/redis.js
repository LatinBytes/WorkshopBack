'use strict'
const redis = require('redis')
const asyncRedis = require("async-redis")
const Log = require('../../../utils/logs')
const ErrorHandler = require('../../../utils/errorHandler')

const host = process.env.REDIS_HOST
const port = process.env.REDIS_PORT

const client = redis.createClient({
  host,
  port
})

client.on('ready', function () {
  Log.info(`-- Redis Ready --`)
})

client.on('connect', function () {
  Log.info(`-- Redis connected --`)
})

client.on('reconnecting', function () {
  Log.info(`-- Redis reconnecting --`)
})

client.on('end', function () {
  Log.info(`-- Redis end --`)
})

client.on('error', function (err) {
  ErrorHandler.handleError(err)
})

client.on('warning', function () {
  ErrorHandler.handleError(err)
})

module.exports = asyncRedis.decorate(client)
