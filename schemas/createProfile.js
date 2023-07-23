const mongoose = require('mongoose')

const MyProfile = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    emailId : {
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('myprofile',MyProfile)