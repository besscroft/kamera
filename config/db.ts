import postgres from 'postgres'

const sql = postgres({
  host: process.env.Postgre_HOST,
  port: process.env.Postgre_PORT,
  database: process.env.Postgre_DATABASE,
  username: process.env.Postgre_USERNAME,
  password: process.env.Postgre_PASSWORD,
  max: 30,
  connect_timeout: 30,
  idle_timeout: 120,
  max_lifetime: 60 * 60,
  transform: {
    undefined: null,
  }
})

export default sql
