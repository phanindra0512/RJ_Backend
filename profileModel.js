const mongoose = require('mongoose')

const ProfileImage = mongoose.Schema({
    name: String,
    image:{
        data : Buffer,
        contentType:String
    }
})

module.exports = mongoose.model('profileimage',ProfileImage)