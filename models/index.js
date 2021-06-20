const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME,  process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    encrypt: false,
    define: {
        freezeTableName: true
    },
    dialectOptions: {
        port: process.env.DB_PORT
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.order = require("./order.model.js")(sequelize, Sequelize);
db.bill = require("./bill.model.js")(sequelize, Sequelize);
db.orderedDish = require("./orderedDish.model.js")(sequelize, Sequelize);
db.menu = require("./menu.model.js")(sequelize, Sequelize);

module.exports = db;