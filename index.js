'use strict'

var mongoose = require("mongoose")
var app= require('./app')
mongoose.Promise= global.Promise;
const port = process.env.PORT|| 8080;
const mongoAtlas='mongodb+srv://root:root@cluster0.dx3t7.mongodb.net/bigsales?retryWrites=true&w=majority'

mongoose.set('useFindAndModify', false)
mongoose.connect(mongoAtlas,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>{
    console.log('conexion a la db de mongo correcta');
    app.listen(port,()=>{
console.log("el servidor de express esta funcionando");
    })
})
.catch(err=>console.log(err))