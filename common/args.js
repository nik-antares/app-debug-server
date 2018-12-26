var minimist = require ('minimist');

var _argv = minimist (process.argv.slice(2));

var args = {};

var all = [];

args.get = function (key) {
	if (all.indexOf(key) != -1 && _argv.all)
		return true;

	return _argv[key];
};

module.exports = args;
