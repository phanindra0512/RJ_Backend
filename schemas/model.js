const mongoose = require('mongoose')

const BrandName = mongoose.Schema({
    brandname:{
        type : String,
        require:true
    },
    date : {
        type: Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('brandname',BrandName)