const { Pool } = require("pg");

const db = new Pool({
    host: "monorail.proxy.rlwy.net",
    user: "postgres",
    password: "bmoPcdchDsSvxQbYnzvcjJmToDskTTEA",
    port: 45341,
    database: "railway",
});

module.exports = db;
