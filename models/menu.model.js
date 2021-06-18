const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('Menu', {
        dishName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price_PLN: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});
};
