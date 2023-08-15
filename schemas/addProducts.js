const mongoose = require('mongoose')

const Products = mongoose.Schema({
    productImage : {
        type: String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productSize:{
        type:String,
        required:true
    },
    productQuantity:{
        type:Number,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('productsList',Products)