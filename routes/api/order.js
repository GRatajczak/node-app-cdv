const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;

router.get('/all', (req, res) => {
    Order.findAll()
        .then(data => res.send(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to get all');
        });
});

router.get('/', (req, res) => {
    Order.findByPk(req.query.id)
        .then(data => res.send(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to get');
        });
});

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
        .then(data => res.status(201).send(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to insert');
        });
});

router.patch('/', (req, res) => {
    Order.update(
        req.body,
        {returning: true, where: {id: req.body.id}}
    )
        .then(() => res.status(204).end())
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to update');
        });
});

router.delete('/', (req, res) => {
    Order.destroy({
        where: {id: req.query.id}
    })
        .then(() => res.status(204).end())
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to delete');
        });
});

router.delete('/all', (req, res) => {
    Order.destroy({
        where: {},
        truncate: true
    })
        .then(() => res.status(204).end())
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to delete all');
        });
});

module.exports = router;