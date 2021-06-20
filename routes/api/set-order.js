const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;
const OrderedDish = db.orderedDish;
const Bill = db.bill;
const Menu = db.menu;
const Promise = require('bluebird');
let  menuIsCompleted = require('../../config/checkMenuStatus');

router.post('/', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    const arrayOfDishes = [];
    let { table, currency, dishes } = req.body;
    
    if(currency !== 'EUR' && currency !== 'USD'){
        currency = 'PLN'
    }

    try {
        let menuStatus = await menuIsCompleted();
        if(menuStatus){
            
            const newBill  = await Bill.create({paidUp: false, currency},{transaction});
            const newOrder = await Order.create(
            {
                orderDate: new Date,
                payDate: null,
                status: 'Złożone',
                table
            }, 
            {transaction}
            );

            await  Promise.each(JSON.parse(dishes), async (item) => {
                const transaction2 = await db.sequelize.transaction();
                const dishFromMenu = await Menu.findOne({where: {id: item.id}},{transaction2});
                if(!dishFromMenu){
                    arrayOfDishes.push({id: item.id})
                }
                if(dishFromMenu){
                    await OrderedDish.create({
                        orderId: newBill.id,
                        billId: newOrder.id,
                        dishName: dishFromMenu.dataValues.dishName,
                        price:  dishFromMenu.dataValues.price_PLN,
                        category: dishFromMenu.dataValues.category,
                        description: dishFromMenu.dataValues.description,
                    }, {transaction2});
                    await transaction2.commit();
                }
            });

            await transaction.commit();

            res.status(201).send({msg: "Zamówienie zostało złożone", notInMenu: {
                msg: 'W menu nie ma takich potraw',
                dishes: arrayOfDishes
            }})
        }else {
            res.status(200).send('Za mało pozycji w menu!')
        }
    }catch (error) {
        await  transaction.rollback();
        res.status(500).send(error);

    }



});


module.exports = router;
