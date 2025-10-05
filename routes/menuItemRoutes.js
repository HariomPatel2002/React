const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

router.post('/', async(req,res)=>{
    try{
        const data = req.body;
        const menu = new MenuItem(data);
        const response = await menu.save();
        console.log(data);
        res.status(201).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
});
router.get('/', async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log(data);
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.get('/:taste',async(req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste=='Sweet' || taste=='Spicy' || taste=='Sour'){
            const response = await MenuItem.find({taste: taste});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid taste '})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal server error'});
    }
})

module.exports = router;