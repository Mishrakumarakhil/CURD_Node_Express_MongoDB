require('./models/db');

const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');


const EmployeeController =require('./controllers/EmployeeController');


var app=express();
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(__dirname+'/index.html');
})

app.set('view engine','ejs');


app.get('/',(req,res)=>{

    res.render('index');

});


app.use(bodyparser.urlencoded ({
    extended: true
}));

app.use(bodyparser.json());

app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname + '/views/layouts/' }));
app.set('view engine','hbs');


app.listen(3010,()=>{
    console.log("Express Server Started at the port number" +3010);
});
app.use('/Employee',EmployeeController);


