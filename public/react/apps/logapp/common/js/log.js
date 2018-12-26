/* eslint no-console : ["off"], no-undef : "off"*/
function logger (prefix, level) {
	//		logQ.sample_run();
	var log = {};
	var _level = 0;
	if (level === 'info')
		_level = 3;
	if (level === 'log')
		_level = 2;
	if (level === 'error')
		_level = 1;

	if(!window.console || !console.log)
		_level = 0;

	if (_level >= 1)
		log.error = function(){
			Array.prototype.unshift.call(arguments, prefix + ' - ');
			console.error.apply(console, arguments);
		};
	else
		log.error = function () {};

	if (_level >= 2)
		log.log = function(){
			Array.prototype.unshift.call(arguments, prefix + ' - ');
			console.log.apply(console, arguments);
		};
	else
		log.log = function () {};

	if (_level >= 3)
		log.info = function(){
			Array.prototype.unshift.call(arguments, prefix + ' - ');
			console.info.apply(console, arguments);
		};
	else
		log.info = function () {};

	return log;
}

export default logger;
