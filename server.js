require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const app = express()
const PORT = process.env.PORT || 8080;


//!middleware
app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/static/style"));
app.use(express.static(__dirname + "/static/javascript"));
app.use(express.json())

//!routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/index.html"));
});
app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/contact.html"));
});
app.get("/movies", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/movies.html"));
});

//!mail
app.post('/contact',(req,res)=>{
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })
    const mailOptions = {
        from: req.body.email,
        to:'hamouda.gmc@gmail.com',
        subject:`message from ${req.body.email} : ${req.body.subject} ` ,
        text:req.body.message
    }
    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            console.log(err) 
            res.send(err)
        }else{
            console.log("email send")
            res.send('success')
        }
    })
})

//!server
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})