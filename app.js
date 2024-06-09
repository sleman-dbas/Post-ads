//the important notes -------------------
//
// express-messages npm very important for big projects 
// very important note for session he spake about storage and there are types and we used the worst which is memory
// we install npm moment to deal with date 
// new notes you should send the (ID) in the form hiden ---
// (for securite token csrf)
// in this project we will use the delete  acrose the client not server using npm axios
// there are many ways to use delte jax , overmethod bt its more complex
// very impotant note global varebals

const express = require('express')
const app = express()
const body_parser=require('body-parser')
//connect to database 
const db = require('./config/database')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

//bring folder static to make the app see it (front_end)
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('node_modules'))// make vison for css and html

//bring ejs tamplet 
app.set('view engine','ejs')
// bring body parser
app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())

//session and config
app.use(session({
  secret: 'alzaabi',
  resave: false,
  saveUninitialized: false,
  cookie:{maxAge:60000*15}
}))
app.use(flash())
// global var

app.use((req,res,next)=>{
  res.locals.user = req.user
  next()
})

// bring passport // perhabs to arrive the passport to other models like user-router
app.use(passport.initialize())
app.use(passport.session())


// bring events routes
const events = require('./routes/events-routes')
const users = require('./routes/user-router')
app.use("/events",events)
app.use('/user',users)

// home page
app.get('/',(req,res)=>{
  res.redirect('/events')
})

app.get('*', (req, res, next) => {  
  res.locals.user = req.user || null;
  next();
});

app.listen(3000,()=>{
    console.log('the app is running')
})