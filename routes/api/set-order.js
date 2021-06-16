const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;
const OrderedDish = db.orderedDish;


router.post('/', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    const { status, table, currency, dishName, price, category, description} = req.body;
    try {
        const newOrder = await Order.create(
        {
            orderDate: new Date,
            payDate: null,
            status,
            table,
            currency
        }, 
        {transaction}
        )

        await OrderedDish.create({
            orderId: newOrder.id,
            billId: 123,
            dishName,
            price,
            category,
            description,

        }, {transaction})
        await transaction.commit();
        res.status(201).send('ok')
    }catch (error) {
        await  transaction.rollback();
        res.status(500).send(error);

    }



});


module.exports = router;