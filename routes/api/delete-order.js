const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const OrderedDish = db.orderedDish;
const Bill = db.bill;

router.delete('/', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        await Bill.destroy({where: {id: req.query.id}, transaction: transaction});
        await OrderedDish.destroy({where: {billId: req.query.id}, transaction: transaction});
        await transaction.commit();

        res.status(204).send({msg: "Zamówienie zostało anulowane"})
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).send(error);
    }
});

module.exports = router;
