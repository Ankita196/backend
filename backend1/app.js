const express = require('express')
const app=express()

const morgan= require('morgan')

const productRouts = require('./api/routes/product')
const orderRouts = require('./api/routes/order')


app.use(morgan('dev'))
//routs which should handle request

app.use('/product',productRouts);
app.use('/order',orderRouts);

//handling error
app.use((req,res,next)=>{
    const error= new Error('Not Found');
    error.status=404;
    next(error);
})
//for handling any error
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:error.message
    })
})

module.exports=app;