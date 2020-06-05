const { Client } = require('pg');
const client = new Client(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'node_web_app',
        password: 'ucreate',
        port: 5432,
    }
);
module.exports = client;