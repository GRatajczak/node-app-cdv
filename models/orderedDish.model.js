const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('OrderedDish', {
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
