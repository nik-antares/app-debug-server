const log   = require ('../common/log').child({ module : 'controllers/home' });

const home = {};

home.get = function (req, res) {
	try {
		res.render ('logapp/index');
	}
	catch (err) {
		log.error ({ err : err, stack : err.stack }, 'home page error');

		res.status (err.status).send (err.message);
	}
};

module.exports = home;

