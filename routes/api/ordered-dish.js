const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const OrderedDish = db.orderedDish;
let  menuIsCompleted = require('../../config/checkMenuStatus');

router.get('/all', async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        OrderedDish.findAll()
            .then(data => res.send(data))
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to get all');
            });
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }
});

router.get('/',async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        OrderedDish.findByPk(req.query.id)
            .then(data => res.send(data))
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to get');
            });
    } else {
        res.status(200).send('Za mało pozycji w menu!')
    }
});

router.post('/', async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        OrderedDish.create(req.body)
            .then(data => res.status(201).send(data))
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to insert');
            });
    } else {
        res.status(200).send('Za mało pozycji w menu!')
    }
});

router.patch('/', async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        OrderedDish.update(
            req.body,
            {returning: true, where: {id: req.body.id}}
        )
            .then(() => res.status(204).end())
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to update');
        });
    } else {
        res.status(200).send('Za mało pozycji w menu!')
    }
});

router.delete('/', async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        OrderedDish.destroy({
            where: {id: req.query.id}
        })
            .then(() => res.status(204).end())
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to delete');
            });
    } else {
        res.status(200).send('Za mało pozycji w menu!')
    }
});

router.delete('/all', async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        OrderedDish.destroy({
            where: {},
            truncate: true
        })
            .then(() => res.status(204).end())
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to delete all');
            });
    } else {
        res.status(200).send('Za mało pozycji w menu!')
    }
});

module.exports = router;