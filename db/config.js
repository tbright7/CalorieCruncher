const { Pool } = require('pg')
const pool = new Pool({
    database: 'mvp'
});

module.exports = {
    pool
}