import postgres from 'postgres'

const sql = postgres({
    host: process.env.Postgre_HOST,            // Postgres ip address[s] or domain name[s]
    port: process.env.Postgre_PORT,          // Postgres server port[s]
    database: process.env.Postgre_DATABASE,            // Name of database to connect to
    username: process.env.Postgre_USERNAME,            // Username of database user
    password: process.env.Postgre_PASSWORD,            // Password of database user
    max                  : 30,            // Max number of connections
    connect_timeout      : 30,            // Connect timeout in seconds
    idle_timeout: 120,
    max_lifetime: 60 * 60,
    transform: {
        undefined: null
    }
})

export default sql
