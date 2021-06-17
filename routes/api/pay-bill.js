const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;
const Bill = db.bill;
const axios = require('axios');
let  menuIsCompleted = require('../../config/checkMenuStatus');
const { toLower } = require('lodash');



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
        console.log(`http://api.nbp.pl/api/exchangerates/rates/a/${currentBill.dataValues.currency}/today`);
        if(currencyToPay !== 'PLN'){
            // const currency = await axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${'usd'}/today`)
            // .then(el => console.log(el.data.rates))
            // console.log(currency.data.rates);
        }
        // await Order.update(
        //     {status: "Zapłacone", payDate: new Date},
        //     {returning: true, where: {id: orderId},},
        //     {transaction}
        // )

        await transaction.commit();
        res.status(200).send('Zamówienie zostało opłacone!')

      
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }

})




module.exports = router;
