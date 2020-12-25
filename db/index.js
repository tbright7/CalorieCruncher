const { pool } = require('./config.js')

pool.connect();

const getFromDB = function (query, callback) {
    pool
        .query(query)
        .then((res) => {
            callback(res.rows);
        })
        .catch(e => {
            console.log(e);
        })
}

const insertIntoDB = function (query, values, callback) {
    pool
        .query(query, values)
        .then((res) => {
            callback(res.rows);
        })
        .catch(e => {
            console.log(e);
        })
}

module.exports = {
    insertIntoDB,
    getFromDB,
}