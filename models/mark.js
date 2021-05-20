'use strict'

var mongoose= require('mongoose')
var Schema= mongoose.Schema;

var productSchema= Schema({
name:String,
price:String,
image:String
})

var Product= mongoose.model('Product',productSchema);

var MarkSchema= Schema({
    name:String,
    image:String,
    category:{type: Schema.ObjectId, ref: 'Category'},
    products:[productSchema]
})

module.exports= mongoose.model('Mark', MarkSchema)