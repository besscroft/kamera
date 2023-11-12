import postgres from 'postgres'

export default defineNuxtPlugin(async (nuxtApp) => {
    const sql = postgres({
        host: process.env.Postgre_HOST,            // Postgres ip address[s] or domain name[s]
        port: process.env.Postgre_PORT,          // Postgres server port[s]
        database: process.env.Postgre_DATABASE,            // Name of database to connect to
        username: process.env.Postgre_USERNAME,            // Username of database user
        password: process.env.Postgre_PASSWORD,            // Password of database user
    })

    nuxtApp.provide("sql", sql)
})
