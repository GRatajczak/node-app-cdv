const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;
const OrderedDish = db.orderedDish;
const Bill = db.bill;

router.delete('/', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const orderId = req.query.id;
        await Order.destroy({where: {id: orderId}, transaction: transaction});
        const orderedDishes = await OrderedDish.find({where: {orderId: orderId}}, {transaction});
        const involvedBillsIds = new Set(orderedDishes.map(order => order.billId));
        await OrderedDish.destroy({where: {orderId: orderId}, transaction: transaction});
        involvedBillsIds.forEach(await async function (billId) {
            const isBillInUsage = await OrderedDish.findOne({where: {billId: billId}}, transaction) != null;
            if (isBillInUsage) {
                Bill.destroy({where: {id: billId}, transaction: transaction})
            }
        });

        await transaction.commit();
        res.status(204).send({msg: "Zamówienie zostało anulowane"})
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).send(error);
    }
});

module.exports = router;
