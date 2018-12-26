const express = require ('express');
const log     = require ('controllers/log');

const router  = express.Router ();

router.use ('/ping', (req, res) => {
	res.send ('pong');
});

router.get  ('/all',  log.get_all);
router.post ('/logs', log.create);

/*
 * Catch 404's here */
router.use ((req, res) => {
	if (req.xhr)
		return res.status (404).send ('not found');

	return res.status(404).render ('global/404', {
		title : 'this is a 4x4'
	});
});

module.exports = router;
