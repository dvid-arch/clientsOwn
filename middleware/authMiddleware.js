const User = require('../model/airUser')
const Admin = require('../model/adminInfo')
const jwt = require('jsonwebtoken')



const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt;

    //check json web token exists & is verified;
    if(token){
        jwt.verify(token, 'owee secret', (err,decoded)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login')
            } else{
                next()
            }
        })
    } else{
        res.redirect('/welc');
    }
}

const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'owee secret', async (err,decoded)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;

                next()
            } else{
                let user = await User.findById(decoded.id)
                let admin = await Admin.findOne({})
                res.locals.user = user;
                res.locals.admin = admin;
                next();
            }
        })
    } else{
        res.locals.user = null;
    }
}

const checkReferal = async (req, res, next) =>{
    const ref = req.cookies.ref;
    console.log(ref)
    if(ref) {
        let user = await User.findById(ref)
        
        if(user){
            user.refered+=1;
            console.log(`user ${user.email} referal increased`)
            user.save()
            res.cookie('ref', '', {httpOnly: true, maxAge:1})
        }      
       
        next()
    } else{
        next()
    }
}

const clearFalseRef = (req, res, next)=>{
    const falseRef = req.cookies.ref
    if(falseRef){
        res.cookie('ref', '', {httpOnly: true, maxAge:1})
        next()
    }
    next()
}

module.exports = {requireAuth, checkUser, checkReferal, clearFalseRef}