const events   = require ('events');
const mongoose = require ('mongoose');
const log      = require ('common/log-middleware').sub_module ('common/db-connection');

class db_connection {
	constructor (db_name, db_url) {
		if (!db_name)
			throw new Error ('no db name provided');

		if (!db_url)
			throw new Error ('no db url provided');

		this.db_name    = db_name;
		this.db_url     = db_url;
		this.db_options = { useNewUrlParser: true };

		this._init ();
	}

	_init () {
		this.conn    = mongoose.createConnection (this.db_url, this.db_options);
		this.emitter = new events.EventEmitter ();

		/*
		 * Now initialize connection events */
		this._events ();
	}

	_events () {
		let __this = this;

		__this.conn.on ('error', (err) => {
			log.error ({ db : __this.db_name, url : __this.db_url, error : err }, 'Connection error to mongoDB');
			process.exit (1);
		});

		__this.conn.on ('disconnected', () => {
			log.warn ({ db : __this.db_name, url : __this.db_url }, 'disconnected');
		});

		__this.conn.on ('connected', () => {
			log.warn ({ db : __this.db_name, url : __this.db_url }, 'connected');
		});

		__this.conn.once ('open', () => {
			log.info ({ db : __this.db_name, url : __this.db_url }, 'connection OK');
			__this.emitter.emit ('db-connected');
		});
	} 
}

module.exports = db_connection;
