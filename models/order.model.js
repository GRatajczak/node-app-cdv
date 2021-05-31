const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('Order', {
        orderDate: {
            type: DataTypes.DATE
        },
        payDate: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.STRING
        },
        table: {
            type: DataTypes.STRING
        },
        currency: {
            type: DataTypes.STRING
        },
        }, {
    });
    return Order;
}

