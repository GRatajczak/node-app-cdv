
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const util = require('util');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const corsOptions = require('./config/development.cjs');
const readFile = util.promisify(fs.readFile);
const db = require('./models/index');
require('dotenv').config();
const Menu = db.menu;
const Promise = require('bluebird');

//endpoints
const bill = require('./routes/api/bill.js');
const menu = require('./routes/api/menu.js');
const order = require('./routes/api/order.js');
const orderedDish = require('./routes/api/ordered-dish.js');
const setOrder = require('./routes/api/set-order.js');
const updateOrder = require('./routes/api/update-order.js');
const payBill = require('./routes/api/pay-bill.js');
const deleteOrder = require('./routes/api/delete-order.js');


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions || {}));
app.disable("x-powered-by");

//Adding endpoints

app.use('/bill', bill);
app.use('/menu', menu);
app.use('/order', order);
app.use('/orderedDish', orderedDish);
app.use('/set-order', setOrder);
app.use('/update-order', updateOrder);
app.use('/pay-bill', payBill);
app.use('/delete-order', deleteOrder);

app.get('/', (req, res) => {
	res.send('Hello World!')
})
const port = process.env.PORT || 3002;

const  start = async () => {
	const [key, cert] = await Promise.all([
		readFile(process.env.HTTPS_KEY_PATH,'ascii'),
		readFile(process.env.HTTPS_CERT_PATH,'ascii'),
	]);
	if (key && cert) {

		db.sequelize.sync();
		https
		.createServer({ key, cert }, app)
		.listen(port, () => console.log("HTTPS server UP - https://localhost:" + port));

	} else {
		console.error("Cannot start server, key or cert not found.");
	}
};


start();

//menu filling
const loadMenu = async () => {
    try {
		fs.readFile('menu.json', 'utf-8', async (err, data) => {
			await  Promise.each(JSON.parse(data), async (item) => {
				const menuItems = JSON.parse(data);
				menuItems.forEach(async el => {
					const transaction = await db.sequelize.transaction();
					await Menu.create({
						dishName: el.dishName,
						price_PLN:  el.price_PLN,
						category: el.category,
						description: el.description,
					}, {transaction});
					await transaction.commit();
				})
			});
		})
	} catch (error) {
        await  transaction.rollback();
    }

};

loadMenu();