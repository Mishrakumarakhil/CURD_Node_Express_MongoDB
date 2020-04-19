require('./Employee.model');


const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser:true},(err)=>{

if(!err){console.log("DB Connected");}
else{console.log("err in DB" +err);}

});

