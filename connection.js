const mysql = require('mysql');

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "library"
})

db.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log("Connected");
    }
});

module.exports = db;