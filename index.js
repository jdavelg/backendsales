'use strict'

var mongoose = require("mongoose")
var app= require('./app')
mongoose.Promise= global.Promise;
const port = process.env.PORT|| 3000

mongoose.set('useFindAndModify', false)
mongoose.connect('',{useNewUrlParser:true})
.then(()=>{
    console.log('conexion a la db de mongo correcta');
    app.listen(port,()=>{
console.log("el servidor de express esta funcionando");
    })
})
.catch(err=>console.log(err))