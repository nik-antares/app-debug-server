const log    = require ('common/log').child ({ module : 'controllers/log' });
const model  = require ('models/log');
const moment = require ('moment');

const controller = {};

controller.get_all = async function (req, res) {

	try {
		let logs = await model.get_all ();

		log.info (`logs "get_all" request ok`);

		res.status (200).send (logs);
	}
	catch (err) {
		let status_code = err.status_code || err.status || 500;
		let message     = err.message || 'logs get_all request failed';

		log.error ({ 
			code    : err.code, 
			message : err.message, 
			stack   : err.stack }, `logs "get_all" request fail`);

		res.status (status_code).send (message);
	}
};

controller.create = async function (req, res) {
	let data = req.body;

	for (var i = 0; i < data.length; i++)
		data[i]['serverTs'] = moment().utc().toISOString();

	try {
		data = await model.create (data);
		res.status (200).send (data);
	}
	catch (err) {
		let status_code = err.status_code || err.status || 500;
		let message     = err.message || 'logs create request failed';

		log.error ({
			code    : err.code,
			message : err.message,
			stack   : err.stack }, `logs "create" request fail`);

		res.status (status_code).send (message);

	}
};

module.exports = controller;
