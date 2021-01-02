const express=require('express');
const path=require('path');
const app=express();
const port=8000;
const bodyparser=require('body-parser'); //this is for the post request on line number 41
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true}); //this will make database of named contactDance

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    age:String,
  });

  const Contact = mongoose.model('Contact', contactSchema);   //this will make collection(file) of named Contact

// EXPRESS SPECIFIC STUFF*************************************************************************
app.use(express.static('static'));  //FOR SERVING STATIC FILES
app.use(express.urlencoded());


// PUG SPECIFIC STUFF*****************************************************************************
app.set('view engine','pug');        //SET THE TEMPLATE ENGINE AS PUG
app.set('views',path.join(__dirname,'views'));   //SET THE VIEWS DIECTORY


// ENDPOIMTS***************************************************************************************
app.get('/',(req,res)=>{
    const data={};
    res.status(200).render('home.pug',data);
});
app.get('/contact',(req,res)=>{
    const data={};
    res.status(200).render('contact.pug',data);
});

// post request is for getting data from user 
app.post('/contact',(req,res)=>{
    // the data we write in contact form is stored in myData variable
    const myData=new Contact(req.body);  //this will make new contact object
    // myData.save() will save the contact object and return one promise and for handle that promise we have to write the '.then' function
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not send to the database")
    })
    // res.status(200).render('contact.pug',data);
});

// START THE SERVER*********************************************************************************
app.listen(port,()=>{
    console.log(`The server is started successfully at port ${port}`);
});