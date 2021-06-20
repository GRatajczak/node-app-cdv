const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('Bill', {
        paidUp: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});
};
