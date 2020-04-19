const express=require("express");
const mongoose=require("mongoose");
const Employee=mongoose.model('Employee');
mongoose.set('useFindAndModify', false);
var router=express.Router();

router.get('/', (req, res) =>{
res.render("Employee/addOrEdit",{
    viewTitle:"Insert Employee Details"
});
});

router.post('/' ,(req, res) =>{
    let id = req.body._id;
   
    
    if(id =='')
    {
    insertRecord(req,res);
    }
    else
    {
        updateRecord(req,res);
    }



    });

    function insertRecord(req,res){

        var employee= new Employee();
        employee.FullName=req.body.FullName;
        employee.Email=req.body.Email;
        employee.Mobile=req.body.Mobile;
        employee.City=req.body.City;
        employee.save((err,doc)=>{
if(!err)
res.redirect('Employee/list');
else
{
    if(err.name== 'ValidationError')
    {
        handleValidationError(err,req.body);
        res.render("Employee/addOrEdit",{
            viewTitle:"Insert Employee Details",
            Employee:req.body
        });
    }
    else
    {
    console.log("error in inserting" +err);
    }
}

        });


    }

    router.get('/list', (req, res) =>{      
        Employee.find().lean().exec((err,data)=>{
         
                if(err)  
                {
                    console.log("error in retrieving " +err);
                } 
                else
                { 
                res.render("Employee/list",{
                    list:data
                            });
                        }
            
            
       });

    });


    function handleValidationError(err,body){

       for(field in err.errors)
       {
           switch(err.errors[field].path){
               case 'FullName':
                   body['FullNameError']=err.errors[field].message;
                   break;
                   case 'Email':
                       body['EmailError']=err.errors[field].message;
                       break;
                       default:
                           break;
           }
       }
    }


function  updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err ,doc)=>{


   
    if(!err)
    {
    res.redirect("Employee/list");}
    else
    {
        if(err.name==validationError){
            handleValidationError(err,req.body);

            res.render("Employee/addOrEdit",{
                viewTitle:"Update Employee",
               
                Employee:req.body


        });}
        else
        {
            console.log("error during update");
        }
        
    }

});

}


    router.get('/:_id', (req, res) =>{

        Employee.findById(req.param('_id')).exec((err ,doc)=>{
           
            if(!err)
            {
                res.render("Employee/addOrEdit",{
                    viewTitle:"Update employee",
                   
                    Employee:{
                        FullName: doc.FullName,
                        Email: doc.Email,
                        Mobile: doc.Mobile,
                        City:doc.City,
                        id: doc._id
                    }


            });
        }

        });


    });
router.get('/delete/:_id', (req,res)=>{
    Employee.findByIdAndRemove(req.param('_id')).exec((err,doc)=>{

    if(!err)
    {
        res.redirect('/Employee/list');
    }
    else{
        console.log("error in delete");
    }

    });
});
module.exports=router;