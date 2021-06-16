const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('Bill', {
        paidUp: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {});
};
