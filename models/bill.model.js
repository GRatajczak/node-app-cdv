const { Sequelize, Model, DataTypes } = require("sequelize");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('sqlite::memory:');


const Bill = sequelize.define('Bill', {
    billID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    }, {
});

module.exports = Bill;