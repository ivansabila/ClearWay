const { Pool } = require("pg");

const db = new Pool({
    host: "localhost",
    user: "postgres",
    password: "pass",
    port: 5432,
    database: "clearWay_db",
});

module.exports = db;
