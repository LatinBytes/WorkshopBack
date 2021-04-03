'use strict'
const connection = require('../../../repositories').db.sql.connection

exports.save = async (user) => {
  const u = await this.getUserById(user.id)

  console.log(u)
  let query = ``
  if (!u) {
    query = `INSERT INTO public."Users"(id, username, avatar, email) VALUES ($1, $2, $3, $4);`
  } else {
    query = `UPDATE public."Users" SET username=$2, avatar=$3, email=$4 WHERE id=$1;`
  }

  await connection.query(query, [user.id, user.username, user.avatar, user.email])
}

exports.getAllUsers = async () => {
  let result = await connection.query('SELECT * FROM public."Users"')
  result = result.rows
  return result
}

exports.getUserById = async (id) => {
  const query = `SELECT id, username, avatar, email FROM public."Users" WHERE id=$1;`
  let result = await connection.query(query, [id])
  result = result.rows[0]
  return result
}
