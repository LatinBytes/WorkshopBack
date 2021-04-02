'use strict'
const chalk = require('chalk')

exports.info = (msg) => {
  console.log(`${chalk.blue('[INFO]')} ${msg}`)
}

exports.warn = (msg) => {
  console.log(`${chalk.yellow('[WARN]')} ${msg}`)
  console.trace()
}
