const User = require('../model/airUser')

const jwt = require('jsonwebtoken')

const handleErrors = (err)=>{
    console.log('error',err)
    let errors = { email: '', password: ''}


    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'that phone number is not registered'
    }  


    //duplicate error code
    if(err.code === 11000){
        errors.email = 'that phone number is already registered';
        return errors;
    }

    //(validate errors)
    if(err.message.includes('userair validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        });
    }

    console.log(errors)
    return errors
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (id)=>{
    return jwt.sign({id},'owee secret', {expiresIn:maxAge})
}

module.exports.sigup_get = (req,res)=>{
    const {firstname,lastname,phone,email, password } = req.body
    
    res.render('signup');
}

module.exports.sigup_post = async (req,res)=>{
    console.log(req.body)
    const {firstname,lastname,phone,email, password } = req.body
    const pwd = password

    try{
        const user = await User.create({firstname,lastname,phone,email,password,pwd});
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge:maxAge*1000})
        res.status(201).json({id: user._id});
    } catch(err){
        let errors = handleErrors(err)
        res.status(400).json(errors)
    }
}

module.exports.login_get =  (req,res)=>{
    res.render('login')
}

module.exports.login_post = async (req,res)=>{
    const {email, password } = req.body
    
    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge:maxAge*1000})
        res.status(200).json({id:user._id})
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({errors})
    }
}


module.exports.logout_get = async (req,res)=>{
    res.cookie('jwt','',{maxAge: 1});
    res.redirect('/login')
}