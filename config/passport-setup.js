const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../model/user')
const { error } = require('jquery')


// register
passport.use('local.singup',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true // to active the ablite for get the (body) from request
},async(req,username,password,done)=>{
    if(req.body.password != req.body.confirm_password){
        return done(null,false,req.flash('error','do not match password'))
    }else{
        await User.findOne({email:username}).then(async(user)=>{
            if(user){
                return done(null,false,req.flash('error','Email is already exiest'))
            }
            if(!user){
                // create user
                let newUser = new User()
                newUser.email = req.body.email
                newUser.password = newUser.hashPassword(req.body.password) 
                newUser.avatar='Profile.jpg'
                await newUser.save().then(()=>{
                    return done(null,user,req.flash('success','user added')) // here ew send the user to serrliaztion
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }).catch((err)=>{
            return done(err)
        })
    }
}))

// login
passport.use('local.login',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async(req,username,password,done)=>{
    await User.findOne({email:username}).then((user)=>{
        if(!user){
            return done(null,false,req.flash('error','user not found'))
        }
        if(user){
            if(user.comparePassword(password,user.password)){ // the first one come from the user (form)
                return done(null,user,req.flash('success','welcome back'))
            }else{
                return done(null,false,req.flash('error','password is wrong'))
            }
        }
    }).catch((err)=>{
        console.log(err)
        return done(null,false,req.flash('error','some thing wrong happened'))
    })
}))


passport.serializeUser((user, done) =>{  done(null, user.id)}) // saving the user in session

passport.deserializeUser(async(id, done)=> {      
    //  console.log(user)
    const user = await User.findById(id)
    done(null,user)

}) // get the users from sesstion
