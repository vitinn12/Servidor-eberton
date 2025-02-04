
module.exports = {

  client: 'pg',
  connection: {
    database: 'usuarios',
    user:     'postgres',
    password: '123davys'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};