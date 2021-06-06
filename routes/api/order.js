const express = require('express')
const router = express.Router()
const db = require("../../models/index");
const Order = db.order

router.get('/', (req,res) => {
    Order.findAll()
    .then(data => res.send(data))

})

router.post('/', (req,res) => {
    const firstOrder = {
        orderDate: new Date(),
        payDate: new Date(),
        status: 'Do zapłacenia',
        table: '4',
        currency: 'test',
    }
    Order.create(firstOrder)
    .then(data => res.send(data))
})

router.put('/', (req,res) => {

})

router.delete('/', (req,res) => {

})

module.exports = router