'use strict'
const connection = require('../../../repositories').db.sql.connection

exports.getAllUsers = async () => {
  let result = await connection.query('SELECT * FROM public."Users"')
  result = result.rows
  console.log(result)
}

exports.warn = (msg) => {
  console.log(`${chalk.yellow('[WARN]')} ${msg}`)
  console.trace()
}
