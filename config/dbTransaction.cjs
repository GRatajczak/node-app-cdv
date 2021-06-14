const db = require("../../models/index");

const transaction = async (cb) => {
    const trans = await db.sequelize.transaction();

    try {
        await cb();
        await trans.commit();
    } catch (error) {
        console.error(error);
        await trans.rollback();
        throw error;
    }
};

module.exports = transaction;
