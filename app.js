
var http=require('http');
var express=require('express');
var nodemailer = require("nodemailer");
var fs = require("fs");
var ejs = require("ejs");
var bodyParser = require('body-parser')
var app=express();
var port = Number(process.env.PORT || 3000);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
 
// Home page
app.get('/',function(req,res){
    res.sendfile('index.html');
      
        console.log('NodeMailer reading console log...' + req.url);

});
 
// sending mail function
app.post('/send', function(req, res){
if(req.body.email == "") {
  res.send("Error: Email should not blank");
  return false;
}
var rec = req.body.email;
console.log(req.body);
var smtpTransport = nodemailer.createTransport("SMTP",{
             service:'gmail', 
     
            auth: {
                 user: 'Senders_id',
                 pass: 'Senders_password'
            }
});

fs.readFile('test.ejs','utf8', function (err, data) {
if (err) {
    console.log(err);
}else{ 


    var mailOptions = {
            from: "Senders_name  <Senders_id>", // sender address
            to: req.body.email,
            subject:'Hello, world',
            html: ejs.render(data, {name:"Stranger"})
           
        };
        console.log("html data ======================>", mailOptions.html);

   } 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
             res.send("Email could not sent due to error: "+error);
        }else{
             res.send("Email has been sent successfully");
        } 
    });
})      
        
});
 
// Starting server
var server = http.createServer(app).listen(port, function() {
console.log("Server is Running on 127.0.0.1:" + port);

});
