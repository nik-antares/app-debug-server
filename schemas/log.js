const mongodb  = require('mongodb');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/*--------------------------------------------------------------------
 *
 * Sub-Schemas required by the main test Schema
 *
 *-------------------------------------------------------------------*/
const appInfo = new mongoose.Schema ({
	appVersion   : { type : String, required : true },
	appName      : { type : String, required : true }
}, {_id : false});


/*--------------------------------------------------------------------
 *
 * Main log Schema
 *
 *-------------------------------------------------------------------*/

let log = new Schema ({
	MACAddress : { type : String, required : true },
	serverTs   : { type : Date,   required : true },
	deviceTs   : { type : Date,   required : true },
	message    : { type : String, required : true },
	data       : { type : Object, required : true },
	level      : { type : String, required : true, enum : ['ERROR', 'FATAL','WARN','TRACE','DEBUG'] },
	appInfo    : { type : appInfo },

});

module.exports = log;
