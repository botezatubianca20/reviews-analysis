
const Knex = require('knex')

var knex = new Knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        database: 'movies',
        user: 'root',
        password: ''
    }

})

module.exports = knex

