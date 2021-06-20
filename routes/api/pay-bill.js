const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;
const OrderedDish = db.orderedDish;
const Bill = db.bill;
const axios = require('axios');
let  menuIsCompleted = require('../../config/checkMenuStatus');



router.put('/', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    let { orderId, split, equally} = req.body;
    let toPay = 0;
    let currencyBid = 1;
    let menuStatus = await menuIsCompleted();
    const splitTable = [];

    if(menuStatus){
        const order = await Order.findOne({where: {id: orderId}}, {transaction});
        const currentBill = await Bill.findOne(
            {where:{id: order.dataValues.id}},
            {transaction}
        );
        const isPaid = currentBill.dataValues.paidUp;
        if(!isPaid){

            let currencyToPay = currentBill.dataValues.currency;

            if(currencyToPay !== 'PLN'){
                const currency = await axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${currencyToPay}/today`);
                currencyBid = currency.data.rates[0].bid;
            }

            const allDishes = await OrderedDish.findAll({where: {orderId: orderId}}, {transaction});
            allDishes.forEach(el => {
                toPay += el.dataValues.price
            });

            const billId = allDishes[0].dataValues.billId;
            await Bill.update(
                {paidUp: true},
                {returning: true, where: {id: billId},},
                {transaction}
            );
            await Order.update(
                {status: 'zapłacone'},
                {returning: true, where: {id: orderId},},
                {transaction}
            );
            if(split === 'true'){
                if(equally !== 'true'){
                    allDishes.forEach(el => {
                        splitTable.push({singlePrice: el.dataValues.price})
                    })
                }else {

                    allDishes.forEach(() => {
                        splitTable.push({singlePriceEqually: ((toPay / allDishes.length) / currencyBid).toFixed(2) })
                    })
                }
            }


            await transaction.commit();
            res.status(200).send({
                msg: `łącznie do zapłaty ${(toPay / currencyBid).toFixed(2)} ${currencyToPay}`,
                split: splitTable
            })
        }else {
            res.status(200).send('zamówienie zostało juz opłacone!')
        }
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }

});




module.exports = router;
