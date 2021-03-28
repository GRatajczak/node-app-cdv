
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const helmet = require('helmet');

const rest = require('./routes/api/rest.js');
const soap = require('./routes/api/soap.js');


app.use(helmet());
app.use(bodyParser.json());


//Adding endpoints
app.use('/rest', rest);
app.use('/soap', soap);

app.get('/', (req, res) => {
	res.send('Hello World!')
})
const server = require('http').createServer(app);

const port = process.env.PORT || 3001
console.log('Server is working on port ' + port);
server.listen(port)