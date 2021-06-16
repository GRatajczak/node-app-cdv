const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Bill = db.bill;

router.get('/all', (req, res) => {
    Bill.findAll()
        .then(data => res.send(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to get all');
        });
});

router.get('/:id', (req, res) => {
    Bill.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to get');
        });
});

router.post('/', (req, res) => {
    Bill.create(req.body)
        .then(data => res.status(201).send(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to insert');
        });
});

router.patch('/', (req, res) => {
    Bill.update(
        req.body,
        {returning: true, where: {id: req.body.id}}
    )
        .then(() => res.status(204).end())
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to update');
        });
});

router.delete('/:id', (req, res) => {
    Bill.destroy({
        where: {id: req.query.id}
    })
        .then(() => res.status(204).end())
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to delete');
        });
});

router.delete('/all', (req, res) => {
    Bill.destroy({
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