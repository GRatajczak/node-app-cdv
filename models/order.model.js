const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('Order', {
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        payDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        table: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});
};

