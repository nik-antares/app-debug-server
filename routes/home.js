const express = require ('express');
const home    = require ('controllers/home');
 
const router  = express.Router ();

router.get ('/ping', function (req, res) {
    res.status (200). send ('pong\n');
});

router.get ('/', function (req, res) {
	res.redirect ('/home/log');
});

router.get  ('/*',  home.get);

/*
 * Catch 404's here */
router.use (function (req, res) {
	if (req.xhr)
		return res.status (404).send ('not found');

	return res.status(404).render ('global/404', {
		title : 'this is a 4x4'
	});
});

module.exports = router;
