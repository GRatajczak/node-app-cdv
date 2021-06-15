const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const OrderedDish = db.orderedDish;

router.get('/all', (req, res) => {
    OrderedDish.findAll()
        .then(data => res.send(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to get all');
        });
});

router.get('/:id', (req, res) => {
    OrderedDish.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to get');
        });
});

router.post('/', (req, res) => {
    OrderedDish.create(req.body)
        .then(data => res.status(201).send(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to insert');
        });
});

router.patch('/', (req, res) => {
    OrderedDish.update(
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
    OrderedDish.destroy({
        where: {id: req.query.id}
    })
        .then(() => res.status(204).end())
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to delete');
        });
});

// todo remove after Paweł's tests
router.delete('/all', (req, res) => {
    OrderedDish.destroy({
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