const http = require('http');
var fs = require('fs');

const hostname = '127.0.0.1';
var port =process.env.port ||process.env.PORT || 3000;




const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){

  fs.readFile(path.join(__dirname+'/index.html'), (err, data) => {
    const result=data.toString().replace("<span id='port'></span>","<span id='port'>"+port+"</span>")
      res.send(result);
   });
  // res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});



const mongoose = require("mongoose");
var url = 'mongodb+srv://missismama:missismissis@cluster0-wcm2d.gcp.mongodb.net/test?retryWrites=true&w=majority'
//'mongodb+srv://missismama:missismissis@cluster0-wcm2d.mongodb.net/test?retryWrites=true&w=majority'
//'mongodb+srv://missismama:missismissis@cluster0-wcm2d.gcp.mongodb.net/test?retryWrites=true&w=majority'
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
const Current = mongoose.model('currentcolors', {
  colors: [String],
  colorson: [Number],
  id:Number
})


app.use(require("body-parser").json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post("/add", (req, res, next) => {
let {colors, colorson, id}=req.body
//console.log(colors)
//console.log(colorson)
//console.log(id)

mongoose.connect(url, {poolSize: 30,reconnectTries: 5000, bufferMaxEntries: 0, useNewUrlParser: true})
const phonenumber = new Current({
  colors: colors,
  colorson: colorson,
  id:id
})
phonenumber
  .save()
  .then(response => {
    console.log('number saved!')
    //mongoose.connection.close()
    res.json(response)
  })


})



app.delete("/deleteall", (req, res, next) => {
	console.log("1")
mongoose.connect(url, {poolSize: 30,reconnectTries: 5000, bufferMaxEntries: 0,useNewUrlParser: true})

Current.find({}).remove({}).then((response)=>{//mongoose.connection.close();
res.json(response)})

console.log("2")
})



app.post("/editfirst", (req, res, next) => {
let {colors, colorson, id}=req.body
//console.log(colors)
//console.log(colorson)
//console.log(id)
mongoose.connect(url, {poolSize: 30,reconnectTries: 5000, bufferMaxEntries: 0,  useNewUrlParser: true})

Current.updateOne({ id: id }, 
	{ colors: colors,colorson: colorson })
  .then(response => {
    console.log('edited')
    //mongoose.connection.close()
    res.json(response)
  })
})


app.get("/all", (req, res, next) => {
	mongoose.connect(url, {poolSize: 30,reconnectTries: 5000, bufferMaxEntries: 0, useNewUrlParser: true})

 Current
  .find({})
  .then(result => {
    result.forEach(telephonenumber => {
    })
    //console.log("telephonenumber")
    //console.log(result)
    //mongoose.connection.close()
    res.json(result)
  });
});

//adding(["s"],[false])



//add the router
app.use('/', router);
app.listen(port);

console.log('Running at Port 3000');


