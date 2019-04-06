exports.kn = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        database: 'movies',
        user: 'test',
        password: ''
    }
});

// connection.connect(function(err) {
//     if (err) throw err;
// });

// module.exports = connection;