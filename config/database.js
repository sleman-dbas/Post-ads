const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/events').then(()=>{
    console.log('the data is conneting')
})

