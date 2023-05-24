const fs=require('fs');
const express=require('express');
const path=require('path')
const app=express();
const bodyparser=require('body-parser');
const port=80;
var mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Contactdance',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('We are connected  to mongodb successfully..');
})
.catch((err)=>{
console.error(err);
});
const danceschema= new mongoose.Schema({
name:String,
email:String,
phone:String,
address:String,
goal:String
});

const Contact = mongoose.model('Contact',danceschema);



// Express Stuff

app.use('/static',express.static('static'))  // for serving static files
app.use(express.urlencoded());


// pug stuff

app.set('view engine','pug');                    // set the template engine as pug
app.set('views',path.join(__dirname,'views'))   // set  the views directory



// pug end points

app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params);
})

app.get('/faculty',(req,res)=>{
    const params={ }
    res.status(200).render('faculty.pug',params);
})
app.get('/class-info',(req,res)=>{
    const params={ }
    res.status(200).render('class.pug',params);
})
app.get('/gallary',(req,res)=>{
    const params={ }
    res.status(200).render('gallary.pug',params);
})

// app.post('/contact',(req,res)=>{
//     var data= new contact(req.body);
//     data.save().then(()=>{
//      res.send('This data is send to database...')
//     }).catch(()=>{
//      res.status(400).send('Data is not sent to database')
//     });
    
//     //  res.status(200).render('contact.pug')
// });
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send('This item has been saved to the database')
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse')
    });
                            })


// start the server

app.listen(80,()=>{
    console.log(`server is running on port : ${port}`);
 })