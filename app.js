require('./connection');
const express = require('express');
const app = express();

app.use(express.json());

const student = require('./routers/student')
app.use('/' , student);


app.listen(4000,(req,res)=>{
    console.log("Server is listening...");
});
