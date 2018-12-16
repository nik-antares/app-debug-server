const express = require ('express');
const mongodb = require ('./mongo-connect');
const moment  = require ('moment');

const app = express ();
const port = 3050;

app.use(express.json());

app.post ('/logs', (req, res) => { 
	const logs = mongodb.logs ();
	const data = req.body;
	
	data['ts'] = moment().utc().toISOString();

	logs.insertOne (data, function(err, result) {
		if (err) {
			return res.send (false).status (500);
		}

		return res.send (true).status (200);
	});
});

app.listen(port, () => console.log(`App is running!`));
