const express= require('express');
const jwt=require('jsonwebtoken');

const userVerify=express.Router();

userVerify.post('/',verifyToken,(req,res,next)=>{
    jwt.verify(req.body.token,'secret',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            var user=authData["user"]
            // res.status(200).json(
            //     {
            //     message:'verified user',
            //     user
            //     }
            // );
            req.body.user=user;
            next();
        }
    })
})

async function verifyToken(req,res,next){
    const header = req.headers.authorization;
    
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.body.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

module.exports=userVerify;