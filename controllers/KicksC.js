const express = require('express');
const router = express.Router();
const Kicks = require('../models/kicksStock.js');

// NEW ROUTE STEP #2 RENDER VIEW
router.get('/kicks/new', (req, res)=>{
    res.render('new.ejs');
});

// CREATE ROUTE STEP #3
router.post('/kicks/', (req, res)=>{
    if(req.body.inStock === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.inStock = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.inStock = false;
    }
    Kicks.create(req.body, (error, createdKicks)=>{
        // console.log();
        
        // res.send(createdKicks);
// CREATE ROUTE STEP #4 - REDIRECT AFTER CREATION
res.redirect('/kicks');
    });
});

// INDEX ROUTE STEP #3
router.get('/kicks', (req, res) => {
    Kicks.find({}, (error, allKicks) => {

// console log all shows all Index entries
        console.log('kicks',allKicks); 

        res.render('index.ejs', {
            kicks: allKicks
        });
    });
});

//___________________
// DISPLAY INDEX ROUTE
router.get('/kicks/shop', (req, res) => {
    Kicks.find({}, (error, allKicks) => {

// console log all shows all Index entries
        console.log('kicks',allKicks); 

        res.render('display_index.ejs', {
            kicks: allKicks
        });
    });
});



// ___________________
// BUY FUNCTIONALITY 
router.put('/kicks/shop:id/buy/', (req, res)=>{ 
    Kicks.findByIdAndUpdate(req.params.id, { $inc: {qty: -1 }},
        (error, buyKicks) =>{ //find the kicks
            console.log(error);
            console.log("====================");
            
        res.redirect('/kicks/shop')
 
        });
    // console.log(req.params.id);
    
    });


    
    // SHOW ROUTE STEP #2
router.get('/kicks/:id', (req, res)=>{
    Kicks.findById(req.params.id, (err, foundKicks)=>{
        res.render('show.ejs', {
            kicks:foundKicks
        });
    });
});

// DELETE ROUTE STEP#2
router.delete('/kicks/:id', (req, res)=>{
    Kicks.findByIdAndRemove(req.params.id, (err, deletedKicks)=>{
        res.redirect('/kicks');//redirect back to fruits index
    });
});

//___________________
// EDIT ROUTE
// EDIT ROUTE STEP #1
router.get('/kicks/:id/edit', (req, res)=>{
    Kicks.findById(req.params.id, (err, foundKicks)=>{ //find the kicks
        res.render('edit.ejs', {
            kicks: foundKicks //pass in found kicks
        });
    });
});

// EDIT ROUTE STEP #2
router.put('/kicks/:id', (req, res)=>{
    if(req.body.inStock === 'on'){
        req.body.inStock = true;
    } else {
        req.body.inStock = false;
    }
    // res.send(req.body);
// UPDATE ROUTE STEP #1
Kicks.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedKicks)=>{

// UPDATE ROUTE STEP #2 MAKE THE PUT ROUTE REDIRECT BACK TO INDEX PAGE
    res.redirect('/kicks');
});
});



module.exports = router;