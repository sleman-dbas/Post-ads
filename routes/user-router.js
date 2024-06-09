const express = require('express')
const router = express.Router()
const User = require('../model/user')
const passport = require('passport')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]
    const fileName = `user-${Date.now()}.${ext}`
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage })

// create middel ware to check if user logged in 
isAuthenticated = (req,res,next)=>{
  if(req.isAuthenticated()) return next()
  res.redirect('/user/login')
}

// login user view 
router.get('/login',(req,res)=>{
    res.render('user/login',{
        errors:req.flash('error'),
        user:req.user
    })
})

// login post request
// router.post('/login',
//     passport.authenticate('local.login',{
//     successRedirect:'/user/profile',
//     failureRedirect:'/user/login',
//     failureFlash: true
// }))
router.post('/login', 
  passport.authenticate('local.login', { failureRedirect: '/user/login' }),
  function(req, res) {
    res.redirect('/user/profile');
  });

// sing up from 
router.get('/singup',(req,res)=>{
    res.render('user/singup',{
        errors:req.flash('error'),
        user:req.user
    })
})

// singup post requset
// router.post('/singup',
//     passport.authenticate('local.singup',{
//         successRedirect:'/user/profile',
//         failureRedirect:'/user/singup',
//         failureFlash: true
//     })  // first we put the name of strategy wich we chose in passport-setup
// )

router.post('/singup', 
  passport.authenticate('local.singup', { failureRedirect: '/user/singup' }),
  function(req, res) {
    res.redirect('/user/profile');
  });

// profile
router.get('/profile',isAuthenticated,(req,res)=>{
      res.render('user/profile',{
          success:req.flash('success'),
          user:req.user
})
})

router.post('/uploadAvatar',isAuthenticated,upload.single('avatar'),async(req,res)=>{
  if(req.file){
  let newfile ={
    avatar:req.file.filename
  }
  
    await User.updateOne({_id:req.user.id},newfile).then(()=>{
    res.redirect('/user/profile')
  })
}else{
  req.flash('error','pleas chose photo ')
  res.render('user/profile',{
    errors:req.flash('error'),
    user:req.user
    
  })
}
})

// logout user
router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/user/login')
})


module.exports = router