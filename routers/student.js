const express = require('express');
const router = express.Router();
const db = require('../connection');
const bcrypt = require('bcrypt');

//register student
router.get("/register" , async(req,res)=>{
    try{
        let email = 'SELECT email from student WHERE email = "'+req.body.email+'"';
        db.query(email , async(err , result)=>{
            if(result != ""){
                return res.status(400).json({
                    error : "Email already exists..."
                })
            }else{
                let password = await bcrypt.hash(req.body.password , 8);
                let sql = 'INSERT INTO student (name , email , class , password ) VALUES("'+ req.body.name+'" , "'+req.body.email+'" , "'+req.body.class+'" , "'+password +'")';    
                db.query(sql , (err , result)=>{
                    if(err) throw err;
                    else res.send("You are registered successfully...");
                })
            }
        })
    }
    catch(err){
        res.status(400).json({
            error : "Something went wrong... " + err
        })
    }
})

/*login student*/
router.post('/login' , async(req , res)=>{
    try{
        let email = "SELECT email from student WHERE email = '"+req.body.email+"'";
        db.query(email , (err , result)=>{
            if(result == ""){
                return res.status(400).json({
                    message : "Oops, Invalid Email..."
                })
            }else {
                const pass = 'SELECT password FROM student WHERE email = "'+req.body.email+'"';
                db.query(pass , async(err , result)=>{
                    const validPass = await bcrypt.compare(req.body.password , result[0].password);
                    if(!validPass){
                        res.status(400).json({
                            message : "Oops,You entered invalid password..."
                        })
                    }else{
                        res.status(200).json({
                            message : "You are login successfully..."
                        })
                    }
                })
            }
        })
    }catch(err){
        res.status(400).json({
            Error : err
        });
    }
})

//update student
router.patch('/update' , async(req,res)=>{
    try{
        const updateRecord = 'UPDATE student SET name = "'+req.body.name+'" , class = "'+req.body.class+'" WHERE email = "'+req.body.email+'" ';

        db.query(updateRecord , (err , result)=>{
            if(err) throw err;
            else {
                    res.status(200).json({
                    "message" : "Data updated successfully"
                })
            }
        })
    }catch(err){
        res.status(400).json({
            Error : err
        })
    }
})

//delete student
router.delete('/delete' , async(req,res)=>{
    try{
        const record = 'DELETE FROM student WHERE email = "'+req.body.email+'"';
        db.query(record , async(err , result)=>{
            if(result.affectedRows){
                res.status(200).json({
                    message : "One record deleted successfully..."
                })
            }else{
                res.status(400).json({
                    message : "Invalid email" 
                })
            }
        })
    }
    catch(err){
        res.status(400).json({
            'Error' : err             
        })
    }
})

module.exports = router;