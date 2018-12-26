var events   = require('events');
var bunyan   = require('bunyan');
var config   = require('./config');

var log = {};
var emitter = new events.EventEmitter();
var children = [];

var log_stdout = bunyan.createLogger ({ 
	name : 'tutela',
	streams : [
		{
			name : "stdout",
			stream : process.stdout,
			level  : 'debug'
		}
	]
});

function sub_app (__sub_app) {
	var child = log.child ({sub_app:__sub_app});
	children.push(child);
	return child;
}

function sub_module (module) {
	var child = log.child ({module:module});
	children.push(child);
	return child;
}

log = log_stdout;

//connect_to_fluent_server ();

module.exports.log = log;
module.exports.emitter = emitter;
module.exports.sub_app = sub_app;
module.exports.sub_module = sub_module;
