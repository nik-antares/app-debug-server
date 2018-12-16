const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'fantasia';
let db;
 
// Use connect method to connect to the server
MongoClient.connect(url, 
	{ useNewUrlParser: true },
	function(err, client) {
		assert.equal(null, err);
		console.log("Mongo Connection successful");

		db = client.db(dbName);

		//	client.close();
	}
);

function logs_collections () {
	if (!db)
		return null;

	return db.collection('app_logs');
}

module.exports.logs = logs_collections;
