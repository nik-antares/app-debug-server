const promise  = require ('bluebird');
const log      = require ('common/log').child ({ module : 'model/logs' });
const db       = require ('common/db')['fantasia'];
const schema   = require ('schemas/log');

const mongo = {};

const model = db.conn.model ('app_logs', schema, 'app_logs');

mongo.get_all = () => {
	let d = promise.pending ();

	let query = {};

	model.find (query, function (err, logs) {
		if (err) {
			log.error ('error getting log list');
			return d.reject (err);
		}

		return d.resolve (logs);
	});

	return d.promise;
};

mongo.create = async (log_data) => {
	let  d = promise.pending ();

	model.insertMany (log_data, function (err, logs) {
		if (err) {
			log.error ('error getting log list');
			return d.reject (err);
		}

		return d.resolve (logs);
	});

	return d.promise;
};

module.exports = mongo;

