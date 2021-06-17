const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;
const OrderedDish = db.orderedDish;
const Menu = db.menu;

let  menuIsCompleted = require('../../config/checkMenuStatus')



router.put('/', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    let { id, status, newDish } = req.body;
    console.log(req.body);
    // if(currency !== 'EUR' || currency !== 'USD'){
    //     currency = 'PLN'
    // }    
    
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        let newDishModel 
        if(newDish){
            newDishModel = await  Menu.findOne({id :newDish.id},{transaction})
        
        
        }
        console.log(newDishModel);
        // await Order.update(
        //     {status},
        //     {returning: true, where: {id},},
        //     {transaction}
        // )
        // .then(() => res.status(201).send({msg: "Zamówienie zostało złożone"}))

        await transaction.commit();
        res.status(200).send('ok')

      
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }

})




module.exports = router;
