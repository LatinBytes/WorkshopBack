'use strict'
const fetch = require('node-fetch')

module.exports = async (req, res, next) => {
  if (req.url.includes('discord') || req.url.includes('login')) {
    next()
    return
  }

  let token = req.query.token

  if (!token) {
    res.redirect('/login')
    return
  }

  let response = await fetch('https://discordapp.com/api/v6/users/@me/guilds', {
    headers: { 'Authorization': `Bearer ${token}` },
  })

  const guilds = await response.json()

  if (guilds.message === '401: Unauthorized') {
    res.redirect('/login')
    return
  }

  const guild = guilds.some(g => g.id === '768278151435386900')

  if (!guild) {
    res.redirect(`/login?msg=NoEstaEnElServerDeDiscord`)
    return
  }

  next()
}
