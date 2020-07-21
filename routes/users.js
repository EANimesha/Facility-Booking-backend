const express= require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt-nodejs')
const users=express.Router();

const User=require("../models/user");

users.post('/register',(req,res)=>{
    const userData={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(!user){
            const hash =bcrypt.hashSync(userData.password);
            userData.password=hash;
            User.create(userData)
            .then(user=>{
                   res.json({status:user.email+' Registered'})
             })
            .catch(err=>{
                res.send('error: '+err);
           })
        }else{
            res.json({error:'User already exists'})
        }
    })
    .catch(err=>{
        res.send('error : '+err)
    })
})

users.post('/login',(req,res)=>{
    User.findOne({
        email:req.body.email
    })
    .exec()
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const token=jwt.sign({user},"secret",{expiresIn:"1h"},(err, token) => {
                    if(err) { console.log(err) }    
                    res.json({token:token});
                });
            }else{
                res.status(400).json({error:'wrong credentials'})
            }
        }else{
            res.status(400).json({error:'User does not exist'}) 
        }
    })
    .catch(err=>{
        res.send('error '+err) 
    })
     
})

module.exports=users;