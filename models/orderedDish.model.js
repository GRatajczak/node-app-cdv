const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('OrderedDish', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        billId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dishName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
};
