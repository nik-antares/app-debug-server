const express = require ('express');
const mongodb = require ('./mongo-connect');
const app = express ();
const port = 3050;

app.use(express.json());

app.get ('/', (req, res) => res.send('Hello World!'));
app.post ('/logs', (req, res) => { 
	console.log (req.body);
	res.send (true).status (200);
});

app.listen(port, () => console.log(`App is running!`));
