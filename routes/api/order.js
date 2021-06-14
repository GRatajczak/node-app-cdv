const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;

router.get('/all', (req, res) => {
    Order.findAll()
        .then(data => res.send(data))
});

router.get('/:id', (req, res) => {
    Order.findByPk(req.params.id)
        .then(data => res.send(data))
});
https://localhost:3001/order
router.post('/', (req, res) => {
    // todo test record, remove in the future
    /*const firstOrder = {
        orderDate: new Date(),
        payDate: new Date(),
        status: 'Do zapłacenia',
        table: '4',
        currency: 'test',
    };*/
    Order.create(req.body)
    .then(data => res.send(data))
});

router.patch('/:id', (req, res) => {
    // todo what with id? Should we pass it with body?
    Order.update(req.body)
        .then(data => res.send(data))
});
router.delete('/:id',async (req, res) => {
    
    const order = await  Order.findByPk(req.params.id)
    const orderRes = await order.destroy();
    console.log(orderRes); // "Jane"
  
    res.status(200).send('ok')
});

module.exports = router;