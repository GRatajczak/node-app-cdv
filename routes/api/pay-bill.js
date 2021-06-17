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
    let { orderId } = req.body;
  
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        const currentBill = await Bill.findOne(
            {where:{id: orderId}},
            {transaction}
        )
        let currencyToPay = currentBill.dataValues.currency
        let currencyBid = 1;
        if(currencyToPay !== 'PLN'){
            const currency = await axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${currencyToPay}/today`)
            currencyBid = currency.data.rates[0].bid;
        }
        let toPay = 0;
        const allDishes = await OrderedDish.findAll({where: {orderId: orderId}}, {transaction})
        allDishes.forEach(el => {
            toPay += el.dataValues.price
            console.log(el.dataValues.price);
            console.log(currencyBid);
        })
        const billId = allDishes[0].dataValues.billId;

        await Bill.update(
            {paidUp: true},
            {returning: true, where: {id: billId},},
            {transaction}
        )
        await transaction.commit();
        res.status(200).send({msg: `do zapłaty ${(toPay / currencyBid).toFixed(2)} ${currencyToPay}`})
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }

})




module.exports = router;
