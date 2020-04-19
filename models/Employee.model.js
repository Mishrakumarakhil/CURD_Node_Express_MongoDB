const mongoose=require("mongoose");

var employeeSchema=new mongoose.Schema({

    FullName:{
        type :String,
      required:'This field this required'
    
    },
    Email:{type :String},
    Mobile:{type :Number},
    City:{type: String}
});

employeeSchema.path('Email').validate((val)=>{
    emailRegExp=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegExp.test(val);}, 'Invalid-Email');


mongoose.model('Employee',employeeSchema);