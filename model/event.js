const mongoose = require("mongoose");

const eventschema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    descraption:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required:true
    },user_id:{
        type:String,
        required:true
    },
    created_at:{
        type: Date,
        required:true
    }
})

let event = mongoose.model('Event',eventschema,'events');
module.exports = event