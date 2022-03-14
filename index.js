const express=require("express")
const app=express()
const path=require("path")
const cors=require('cors')
const forms=require("./orm/datasync")
const authorbooksapi= require('./orm/routes')
const infoschemaapi=require('./mongoose/infoschemaapi')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sterling');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("mongo db connection is open");
});

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "public/styles")))

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set("views", path.join(__dirname, "public/views"))
app.set("view engine", "pug")

app.use("/forms", forms)
app.use("/authorbooksapi",authorbooksapi)

app.use("/infoschema", infoschemaapi)

app.get("/",function(request,response){
    response.sendFile(path.join(__dirname,"public/index.html"))
})

app.get("/status",function(request,response){
    response.send("Server Started...")
})

app.listen("8000",function(){
    console.log("server started in port number http://localhost:8000")
})
