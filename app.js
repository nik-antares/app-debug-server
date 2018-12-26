require ('app-module-path').addPath (__dirname);

const express      = require ('express');
const path         = require ('path');
const cookieParser = require ('cookie-parser');
const bodyParser   = require ('body-parser');
const session      = require ('express-session');
const redis        = require ('connect-redis')(session);
const e_logger     = require ('express-bunyan-logger');

const log          = require ('common/log');

const logs         = require ('routes/log');
const home         = require ('routes/home');

const sess = { 
	cookie: { 
		secure: true,
		proxy : true,
	},
	secret: '&^%Gbu45t;#tpxza12^%$',
	saveUninitialized: false,
	resave: true,
	name  : 'app.log',
	store : new redis ({ ttl: 1800 }),
};

const app = express ();

const port = '3000';

app.listen (port);

app.set ('views', __dirname + '/public/views');
app.set ('view engine', 'jade');

if (process.env.NODE_ENV === 'production')
	app.set ('view cache', 'true');

app.set ('trust proxy', true);
sess.cookie.secure = true;

app.use (express.static (path.join (__dirname, 'public')));

app.use (cookieParser());
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: false }));
app.use (session(sess));

//app.use ('/framework', express.static (__dirname + '/public/framework-react-mdb'));
//app.use ('/exam/assets', express.static (__dirname + '/public/framework-react-mdb/dist/assets'));

app.use (e_logger ({
	genReqId: function (req) { 
		return req.req_id; 
	},
	format  : "HTTP :incoming :status-code :method :url :remote-address :res-headers[cookie]",
	excludes: [ 'req' , 'res', 'req-headers', 'res-headers', 'user-agent',
		'body', 'short-body', 'response-hrtime', 'http-version',
		'incoming', 'remote-address', 'method', 'url', 'status-code', 'ip'
	],
	levelFn : function (status, err) {
		if (status >= 400)
			return err;
	},
	logger  : log
}));

app.use (e_logger.errorLogger ({
	showStack : true
}));

app.use ('/log', logs);
app.use ('/home', home);

app.use ('/ping', (req, res) => {
	res.send ('pong');
});

/*
 * Error handlers
 * --------------------
 * Development error handler - will print stacktrace
 */

app.use ((__err, req, res) => {
	let message;

	if (!__err)
		return res.send (message);

	if (req.xhr)
		return res.send (__err);

	message = __err.message;

	return res.send (message);
});

module.exports = app;
