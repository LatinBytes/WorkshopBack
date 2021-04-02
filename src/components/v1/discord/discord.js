'use strict'
const router = require('express').Router()
const discord = require('../../../repositories').http.discord

router.get('/login', (req, res) => {
  res.redirect(discord.getLoginEndpoint())
})

router.get('/callback', async (req, res) => {
  if (!req.query.code) {
    throw new Error('NoCodeProvided')
  }

  const code = req.query.code

  const json = await discord.getToken(code)

  res.redirect(`/?token=${json.access_token}`)
})

module.exports = router
