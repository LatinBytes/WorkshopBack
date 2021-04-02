'use strict'
const { Pool } = require('pg')
const Log = require('../../../utils/logs')
const ErrHanlder = require('../../../utils/errorHandler')

const user = process.env.PGDB_USER
const host = process.env.PGDB_HOST
const port = process.env.PGDB_PORT
const database = process.env.PGDB_DB_NAME
const password = process.env.PGDB_USER_PASSWORD

const pool = new Pool({
  user,
  host,
  port,
  database,
  password,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('connect', client => {
  Log.info(` -- connected to DB --`)
})

pool.on('remove', client => {
  Log.info(` -- disconected from DB --`)
})

pool.on('error', (err, client) => {
  Log.warn(` -- error on connectio to DB --`)
  ErrHanlder.handleError(err)
})

module.exports = pool
