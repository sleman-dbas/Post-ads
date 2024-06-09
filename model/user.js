const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs')

const userschema = new mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
})
userschema.methods.hashPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
userschema.methods.comparePassword = (password,hash)=>{
    return bcrypt.compareSync(password,hash)
}

let User = mongoose.model('User',userschema,'users');
module.exports = User