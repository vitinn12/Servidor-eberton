
module.exports = {

  client: 'pg',
  connection: {
    database: 'cadusuarios',
    user:     'postgres',
    password: '123456'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};