const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;
const OrderedDish = db.orderedDish;
const Bill = db.bill;

router.delete('/', async (req, res) => {
    const transactionOne = await db.sequelize.transaction();
    const transactionTwo = await db.sequelize.transaction();
    try {
        const orderId = req.query.id;
        await Order.destroy({where: {id: orderId}, transaction: transactionOne});
        const orderedDishes = await OrderedDish.findAll({where: {orderId: orderId}, transaction : transactionOne});
        const involvedBillsIds = new Set(orderedDishes.map(order => order.billId));
        await OrderedDish.destroy({where: {orderId: orderId}, transaction: transactionOne});

        involvedBillsIds.forEach(await async function (billId) {
            const isBillInUsage = await OrderedDish.findOne({where: {billId: billId}}, transactionTwo) != null;
            if (!isBillInUsage) {
                Bill.destroy({where: {id: billId}, transaction: transactionTwo})
            }
        });

        await transactionTwo.commit();
        await transactionOne.commit();
        res.status(204).send({msg: "Zamówienie zostało anulowane"})
    } catch (error) {
        console.log(error);
        await transactionTwo.rollback();
        await transactionOne.rollback();
        res.status(500).send(error);
    }
});

module.exports = router;
