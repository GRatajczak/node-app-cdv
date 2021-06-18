const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const OrderedDish = db.orderedDish;
const Bill = db.bill;

router.delete('/:id', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        await Bill.delete({id: req.query.id}, {transaction});
        await OrderedDish.delete({billId: req.query.id});
        await transaction.commit();

        res.status(201).send({msg: "Zamówienie zostało anulowane"})
    } catch (error) {
        await transaction.rollback();
        res.status(500).send(error);
    }
});


module.exports = router;
