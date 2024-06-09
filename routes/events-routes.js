const express=require('express')
const Router = express.Router()
const events = require('../model/event')
const {check,validationResult} = require('express-validator')
const { error, event } = require('jquery')
// to add the npm moment 
const moment = require('moment')
const router = require('./user-router')
moment().format()

isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.redirect('/user/login')
}


// Router.get('/new',async(req,res)=>{

//     let pageNo = req.query.page
//     console.log(pageNo)
//     if(pageNo == 0){
//         pageNo = 1
//     }
//     let q ={
//         limit:req.query.limit,
//         skip: 6 *(pageNo - 1)
//     }
//     // find total documents
//     let totalDocuments = 0
//     // find all recordes
//     await events.countDocuments().then(async(response)=>{
//         totalDocuments = parseInt(response)
        
//     await events.find({},{},q).
//     then(async(eventt)=>{
//         let chunk = []
//         let chunkSize = 3
//         for(let d = 0 ; d<eventt.length;d+=chunkSize){
//             chunk.push(eventt.slice(d,chunkSize+d))
//         } 
//     // res.json(chunk)
//     //res.json(eventt) 
//     res.render('event/index',{
//         chunk:chunk,
//         message:req.flash('info'),
//         total:parseInt(totalDocuments),/////
//         page:pageNo,

//     })
// }).catch((err)=>res.json(err))
//     }).catch((err)=>{
//         console.log(err)
//     })
// })


//create new event


Router.get('/create',isAuthenticated,(req,res)=>{
    res.render('../views/event/create.ejs',{
        errors: req.flash('errors'),
        user:req.user
    })
})


Router.get('/:pageNo?',async(req,res)=>{
    let pageNo=1
    if(req.params.pageNo){
        pageNo = parseInt(req.params.pageNo)
    }
    if(req.params.pageNo == 0||req.params.pageNo == undefined){
        pageNo = 1
    }
    let q ={
        limit:6,
        skip: 5 *(pageNo - 1)
    }
    // find total documents
    let totalDocuments = 0
    // find all recordes
    await events.countDocuments().then(async(response)=>{
        totalDocuments = parseInt(response)
        
    await events.find({},{},q).
    then(async(eventt)=>{
        let chunk = []
        let chunkSize = 3
        for(let d = 0 ; d<eventt.length;d+=chunkSize){
            chunk.push(eventt.slice(d,chunkSize+d))
        } 
    // res.json(chunk)
    //res.json(eventt) 
    res.render('event/index',{
        chunk:chunk,
        message:req.flash('info'),
        total:parseInt(totalDocuments),
        pageNo:pageNo,
        user:req.user
    })
}).catch((err)=>res.json(err))
    }).catch((err)=>{
        console.log(err)
    })
})

//save event to db  install npm i body-parser
Router.post('/create',[
    check('title').isLength({min:5}).withMessage('title should be more than 3 char'),
    check('descraption').isLength({min:5}).withMessage('descraption should be more than 3 char'),
    check('location').isLength({min:5}).withMessage('location should be more than 3 char'),
    check('date').isLength({min:5}).withMessage('date should be validate')
],async(req,res)=>{
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash("errors",errors.array())
        res.redirect('/events/create')
    } 
    else{
        // const {title,descraption,location,date} = req.body
    const New_event = new events({
        title:req.body.title,
        descraption:req.body.descraption,
        location:req.body.location,
        date:req.body.date,
        created_at:Date.now(),
        user_id:req.user.id
    })
    await New_event.save().then(()=>{
        console.log('the event was added')
        req.flash('info','the event was created successfuly')
        res.redirect('/events') // for the requst come from the beginning and do fetsh for data
    })
    .catch((err)=>{
        console.log(err)
    })
    }
})

Router.get('/show/:id',async(req,res)=>{
    await events.findOne({_id:req.params.id}).then((event)=>{
        //console.log(event)
        res.render('event/show',{ 
            event:event,
            user:req.user
        })
    }).catch((err)=>{console.log(err)})
})
//edit router
Router.get('/edit/:id',isAuthenticated,async(req,res)=>{
    await events.findOne({_id:req.params.id}).then((event)=>{
        //console.log(event)
        res.render('event/edit',{ 
            event:event,
            eventDate:moment(event.date).format('YYYY-MM-DD'),
            errors:req.flash('errors'),
            message:req.flash('info'),
            user:req.user
        })
    }).catch((err)=>{console.log(err)})

})
// update the form 
Router.post('/update',isAuthenticated,
[  check('title').isLength({min:5}).withMessage('title should be more than 3 char'),
check('descraption').isLength({min:5}).withMessage('descraption should be more than 3 char'),
check('location').isLength({min:5}).withMessage('location should be more than 3 char'),
check('date').isLength({min:5}).withMessage('date should be validate')],
async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash("errors",errors.array())
        res.redirect('/events/edit/'+ req.body.id)
    } 
    else{
        const {title,descraption,location,date} = req.body
        let newField = {
            title:title,
            descraption:descraption,
            location:location,
            date:date
        }
    let query = {_id:req.body.id}
    await events.updateOne(query,newField).then(()=>{
        req.flash('info','the envents update succsessfuly')
        res.redirect('/events')
    }).catch((err)=>{
        console.log(err)
    })
    }
})
Router.delete('/delete/:id',isAuthenticated,async(req,res)=>{
    let query = {_id:req.params.id}
    await events.deleteOne(query).then(()=>{
        res.status(200).json('delete')
    }).catch((err)=>{
    res.status(404).json('there was an error')
    })
})


module.exports=Router