var promise = require('bluebird');
var ioredis = require('ioredis');
var log     = require('./log').sub_module ('common/cache');

/*
 * Set the default expiry to 1 day
 */
var default_expiry = 1 * 24 * 60 * 60;

class Cache {
	constructor(options) {
		if (!options)
			throw new Error ('no options specified while instantiating cache');

		if (!options.namespace)
			throw new Error ('no "namespace" specified while instantiating cache');

		this.expiry    = options.expiry || default_expiry;
		this.namespace = options.namespace;

		/*
		 * Connect to REDIS
		 */
		this._init ();
	}

	_init () {
		/*
		 * Connect to REDIS
		 */
		this.redis = new ioredis({
			retryStrategy : function (times) { return Math.min(times * 1000, 10000); },
			keyPrefix     : this.namespace,
		});

		this.redis.on('connect', function () {
			log.debug('redis connection ok');
		});

		this.redis.on('error', function (err) {
			log.error({ err }, 'redis connection error');
		});

		this.redis.on('close', function () {
			log.warn('redis connection closed');
		});
		this.redis.on('reconnecting', function () {
			log.info('redis reconnecting ...');
		});
	}

	_set (key, val) {
		return this.redis.set (key, val, 'EX', this.expiry);
	}

	_get (key) {
		return this.redis.get (key);
	}

	_del (key) {
		return this.redis.del (key);
	}
}

module.exports = Cache;
