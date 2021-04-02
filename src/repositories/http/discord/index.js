'use strict'
const fetch = require('node-fetch')
const _encode = require('../../../utils/utils').encode

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT = process.env.REDIRECT

exports.getLoginEndpoint = () => {
  return `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT)}&response_type=code&scope=identify%20email%20guilds`
}

exports.getToken = async (code) => {
  let data = {
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': REDIRECT,
    'scope': 'identify'
  }

  let params = _encode(data)

  const response = await fetch(`https://discordapp.com/api/oauth2/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    })

  const json = await response.json()
  return json
}
