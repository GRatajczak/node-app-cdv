
const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const https = require('https')
const util = require('util')
const limit = require('express-rate-limit')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const corsOptions = require('./config/development.cjs')
const readFile = util.promisify(fs.readFile);

//endpoints
// const rest = require('./routes/api/rest.js');
// const soap = require('./routes/api/soap.js');


app.use(helmet());
app.use(bodyParser.json());
app.use(cors(corsOptions || {}))
app.disable("x-powered-by");
//Adding endpoints
// app.use('/rest', rest);
// app.use('/soap', soap);

app.get('/', (req, res) => {
	res.send('Hello World!')
})
// const server = require('http').createServer(app);

const port = process.env.PORT || 3001
const  start = async () => {
	const [key, cert] = await Promise.all([
		readFile('_security/key.pem','ascii'),
		readFile('_security/cert.pem','ascii'),
	]);
	console.log(key);
	if (key && cert) {
		https
			.createServer({ key, cert }, app)
			.listen(port, () => console.log("HTTPS server UP - https://localhost:" + port));
	} else {
		console.error("Cannot start server, key or cert not found.");
	}
}


start()
