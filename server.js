//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const Kicks = require('./models/kicksStock.js');
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/basiccrud' + `Kicks-stock`;

// Connect to Mongo
mongoose.connect(MONGODB_URI , { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
// app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//___________________
// START OF ROUTES FROM HERE

//___________________
// NEW ROUTE

// // NEW ROUTE STEP #1
// app.get('/' , (req, res) => {
//   res.send('Kicks-stock is live!');
// });

// NEW ROUTE STEP #2 RENDER VIEW
app.get('/kicks/new', (req, res)=>{
    res.render('new.ejs');
});


//___________________
// CREATE ROUTE

// CREATE ROUTE STEP #1
// app.post('/ks/', (req, res)=>{
//     res.send('received');
// });

// CREATE ROUTE STEP #2
// app.post('/ks/', (req, res)=>{
//     res.send(req.body);
// });

// CREATE ROUTE STEP #3
app.post('/kicks/', (req, res)=>{
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

//___________________
// INDEX ROUTE


// INDEX ROUTE STEP #1
// app.get('/ks', (req, res)=>{
//     res.send('kicks-stock shop page');
// });

// INDEX ROUTE STEP #2
// app.get('/ks/', (req, res)=>{
//     res.render('index.ejs');
// });

// INDEX ROUTE STEP #3
app.get('/kicks', (req, res) => {
    Kicks.find({}, (error, allKicks) => {

// console log all shows all Index entries
        console.log('kicks',allKicks); 

        res.render('index.ejs', {
            kicks: allKicks
        });
    });
});
    

//___________________
// DISPLAY ROUTE
app.get('/kicks/shop', (req, res) => {
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
app.put('/kicks/shop:id/buy/', (req, res)=>{ 
    Kicks.findByIdAndUpdate(req.params.id, { $inc: {qty: -1 }},
        (error, buyKicks) =>{ //find the kicks
            console.log(error);
            console.log("====================");
            
        res.redirect('/kicks/shop')
 
        });
    // console.log(req.params.id);
    
    });

    // app.put("/kicks/shop/:id/buy/", (req, res) => {
    //     Kicks.findByIdAndUpdate ( req.params.id, { qty: (req.params.qty - 1) }, (err, buyKicks) => {
    //         res.redirect(`/kicks/shop/${req.params.id}`);
    //     }) 
    // });

//___________________
// SHOW ROUTE

// SHOW ROUTE STEP #1
// app.get('/kicks/:id', (req, res)=>{
//     Kicks.findById(req.params.id, (err, foundKicks)=>{
//         res.send(foundKicks);
//     });
// });

// SHOW ROUTE STEP #2
app.get('/kicks/:id', (req, res)=>{
    Kicks.findById(req.params.id, (err, foundKicks)=>{
        res.render('show.ejs', {
            kicks:foundKicks
        });
    });
});

//___________________
// DELETE ROUTE

// DELETE ROUTE STEP#1
// app.delete('/kicks/:id', (req, res)=>{
//     res.send('deleting...');
// });

// DELETE ROUTE STEP#2
app.delete('/kicks/:id', (req, res)=>{
    Kicks.findByIdAndRemove(req.params.id, (err, deletedKicks)=>{
        res.redirect('/kicks');//redirect back to fruits index
    });
});

// // //___________________
// // // BUY FUNCTIONALITY 
// app.put('/kicks/:id/buy/', (req, res)=>{ 
//     Kicks.findByIdAndUpdate(req.params.id, {qty:(params.id -1)},
//         (err) =>{ //find the kicks
//             console.log();
            
//         res.redirect('/kicks/')
 
//         });
//     });




//___________________
// EDIT ROUTE
// EDIT ROUTE STEP #1
app.get('/kicks/:id/edit', (req, res)=>{
    Kicks.findById(req.params.id, (err, foundKicks)=>{ //find the kicks
        res.render('edit.ejs', {
            kicks: foundKicks //pass in found kicks
        });
    });
});

// EDIT ROUTE STEP #2
app.put('/kicks/:id', (req, res)=>{
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


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));