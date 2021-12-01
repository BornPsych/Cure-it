const express = require("express");
const diagonose = require("./utils/nlp");
var cors = require('cors')
var app = express()

app.use(cors())

app.get("/dia", (req, res) => {
  var obj ={
    sex:req.query.sex,
    age: {
      value:Number(req.query.age),
    },
  text:String(req.query.text),
  symid:req.query.symid,
  symcid:req.query.symcid,
  }
  
  //console.log(req.query.symptom.length)
    diagonose(obj,(error, response) => {
       if (error) {
        return res.send("error: invalid input");
      } 
  
      else {
        res.send({
          response,
        });
      }
    });
  });
  
  app.listen(3000, () => {
    console.log("server started at port 3000");
  });