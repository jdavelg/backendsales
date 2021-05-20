'use strict'

var mongoose= require('mongoose')
var Schema= mongoose.Schema

var CategorySchema= Schema({
    name:String,
    image:String
})

module.exports=mongoose.model('Category', CategorySchema)