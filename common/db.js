const db_connection = require ('common/db-connection');
const config        = require ('common/config');

const db = {};

/* Create staffroom db connection */
db.fantasia = new db_connection ('fantasia', config.fantasia.mongo.url);

module.exports = db;
