const Express = require('express');
const Speakeasy = require("speakeasy");
const bodyParser = require('body-parser');
const expressLayouts=require('express-ejs-layouts');


var app=Express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(expressLayouts);
app.set('view engine','ejs');

app.post('/totp',(req,res)=>{
    var secret = Speakeasy.generateSecret({length:20});
    res.send({'secret': secret.base32});
});

app.post('/totp-gen',(req,res)=>{
    res.send({
        "token": Speakeasy.totp({
            secret:req.body.secret,
            encoding:"base32",
            
        }),
        "remaning":(30-Math.floor(new Date().getTime()/1000.0%30))
    })
    
});

app.post('/totp-validate',(req,res)=>{
res.send({
    "valid":Speakeasy.totp.verify({
        secret:req.body.secret,
        encoding:"base32",
        token:req.body.token,
        window:0
    })
})
})


app.listen(7000,()=>{
    console.log('server started at 7000');
})
