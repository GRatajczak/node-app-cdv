const express = require('express');
const router = express.Router();
const db = require("../../models/index");
const Order = db.order;
let  menuIsCompleted = require('../../config/checkMenuStatus')

router.get('/all', async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        Order.findAll()
            .then(data => res.send(data))
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to get all');
            });
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }
});

router.get('/', async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        Order.findByPk(req.query.id)
            .then(data => res.send(data))
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to get');
            });
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }
});

router.post('/', async (req, res) => {
    // todo test record, remove in the future
    // const firstOrder = {
    //     orderDate: new Date(),
    //     payDate: new Date(),
    //     status: 'Do zapłacenia',
    //     table: '4',
    //     currency: 'test',
    // };
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        Order.create(req.body)
            .then(data => res.status(201).send(data))
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to insert');
            });
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }
});

router.patch('/', async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        Order.update(
            req.body,
            {returning: true, where: {id: req.body.id}}
        )
            .then(() => res.status(204).end())
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to update');
            });
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }   
});

router.delete('/:id', async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        Order.destroy({
            where: {id: req.params.id}
        })
            .then((el) =>{
                console.log(el);    
                res.status(204).end()
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to delete');
            });
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    }   
});

router.delete('/all', async (req, res) => {
    let menuStatus = await menuIsCompleted();
    if(menuStatus){
        Order.destroy({
            where: {},
            truncate: true
        })
            .then(() => res.status(204).end())
            .catch((err) => {
                console.log(err);
                res.status(500).send('Failed to delete all');
            });
    }else {
        res.status(200).send('Za mało pozycji w menu!')
    } 
});

module.exports = router;