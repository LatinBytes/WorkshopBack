'use strict'
const fetch = require('node-fetch')
const redis = require('../repositories').db.cache.redis

const GUILD_ID = process.env.GUILD_ID

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

  const idUser = await redis.get(token)
  if (idUser !== null) {
    next()
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

  const guild = guilds.some(g => g.id === GUILD_ID)

  if (!guild) {
    res.redirect(`/login?msg=NoEstaEnElServerDeDiscord`)
    return
  }

  response = await fetch('https://discordapp.com/api/v6/users/@me', {
    headers: { 'Authorization': `Bearer ${token}` },
  })

  const user = await response.json()

  await redis.set(token, user.id)

  next()
}
