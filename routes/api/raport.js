const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Bill = db.bill;
const Order = db.order;
const OrderedDish = db.orderedDish;
const { Op } = require("sequelize");
let  menuIsCompleted = require('../../config/checkMenuStatus');
const Promise = require('bluebird');



router.get('/', async (req, res)=> {
    const {dateStart, dateEnd} = req.body;
    const transaction = await db.sequelize.transaction();
    let menuStatus = await menuIsCompleted();
    let ordersPrices = 0;
    let billsPaid = 0;
    let billsNotPaid = 0;
    if(menuStatus){

    const allOrders = await Order.findAll({
        where: {
            orderDate: {
                [Op.and]: {
                    [Op.gte]: dateStart,
                    [Op.lte]: dateEnd,
                }
            }
        }
    }, {transaction})

    await Promise.each(allOrders, (async element => {

        const allOrderedDishes = await OrderedDish.findAll({
            where: {
                orderId: element.id
            }
        }, {transaction})

        allOrderedDishes.forEach(elemnet => {
            ordersPrices += elemnet.dataValues.price
        })

        allOrderedDishes.forEach(async element => {
            const allBills = await Bill.findAll({
                where: {
                    id: element.dataValues.billId,
                }
            }, {transaction})
            allBills.forEach(el => {
                if(el.dataValues.paidUp){
                    billsPaid++;
                }else {
                    billsNotPaid++;
                }
            })
        })

        return ordersPrices;
    }))


    await transaction.commit();

    res.send({
        orderCount: allOrders.length,
        priceCount: ordersPrices,
        billsPaid: billsPaid,
        billsNotPaid: billsNotPaid
    })
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }
})



module.exports = router;