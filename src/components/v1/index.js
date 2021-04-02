'use strict'
const router = require('express').Router()

const discord = require('./discord/discord')

router.use('/discord', discord)

module.exports = router
