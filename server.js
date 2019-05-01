//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
require('dotenv').config()
const app = express ();
const db = mongoose.connection;
const session = require('express-session')

// ADDED TO KicksC CONTROLLER ROUTE
// const Kicks = require('./models/kicksStock.js');



// ____________________
// AUTHENTICATION CONFIGURATION
const mongoURI = process.env.MONGO_URI


// // MOBILE NAV COLLAPSE DEMO

// document.addEventListener('DOMContentLoaded', function() {
//   const elems = document.querySelectorAll('.sidenav');
//   const instances = M.Sidenav.init(elems, options);
// });  



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

// DATABASE AND DATABASE CONNECTION
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
app.use(session({
    secret: "feedmeseymour",
    resave: false,
    saveUninitialized: false
  }))


//   app.get('/', (req, res) => {
//     // res.send('login_index.ejs')
//     console.log("___________________________")
//   console.log(req.session);
//   console.log("___________________________")

//   res.render('login_index.ejs', {
//     currentUser: req.session.currentUser
// })
// });

//___________________
// LOGIN INDEX ROUTE
app.get('/kicks/user', (req, res) => {

        res.render('login_index.ejs', {
            currentUser: req.session.currentUser
        });
});

app.get('/app', (req, res)=>{
    if(req.session.currentUser){
        // console.log(currentUser);
        
        res.render('app/app_index.ejs')
    } else {
        res.redirect('/sessions/new');
    }
})

//___________________
// START OF ROUTES FROM HERE
// REPLACED WITH CONTROLLER
const kicksController = require('./controllers/KicksC');
app.use(kicksController);

const usersController = require('./controllers/users_controller');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions_controller')
app.use('/sessions', sessionsController)
//___________________
// NEW ROUTE

// // NEW ROUTE STEP #1
// app.get('/' , (req, res) => {
//   res.send('Kicks-stock is live!');
// });



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


//___________________
// DELETE ROUTE

// DELETE ROUTE STEP#1
// app.delete('/kicks/:id', (req, res)=>{
//     res.send('deleting...');
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));