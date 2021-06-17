const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;
const OrderedDish = db.orderedDish;
const Bill = db.bill;
const Menu = db.menu;

let  menuIsCompleted = require('../../config/checkMenuStatus')

router.post('/', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    let { status, table, currency, dishName, price, category, description, dishes } = req.body;
    
    if(currency !== 'EUR' && currency !== 'USD'){
        currency = 'PLN'
    }

    try {
        let menuStatus = await menuIsCompleted();
        if(menuStatus){
            

            const newBill  = await Bill.create({paidUp: false, currency},{transaction})

            const newOrder = await Order.create(
            {
                orderDate: new Date,
                payDate: null,
                status,
                table
            }, 
            {transaction}
            )
         
            await OrderedDish.create({
                    orderId: newBill.id,
                    billId: newOrder.id,
                    dishName,
                    price,
                    category,
                    description,
                }, {transaction})
            

            await transaction.commit();

            res.status(201).send({msg: "Zamówienie zostało złożone", menuElements: []})
        }else {
            res.status(200).send('Za mało pozycji w menu!')
        }
    }catch (error) {
        await  transaction.rollback();
        res.status(500).send(error);

    }



});


module.exports = router;
