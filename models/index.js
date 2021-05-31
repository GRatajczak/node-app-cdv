const Sequelize = require("sequelize");
const sequelize = new Sequelize('exampledb',  'exampleuser', 'examplepass', {
    host: 'localhost',
    dialect: 'mysql',
    encrypt: false,
    define: {
        freezeTableName: true
    },
    dialectOptions: {
        port: 3307
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.order = require("./order.model.js")(sequelize, Sequelize);

module.exports = db;    