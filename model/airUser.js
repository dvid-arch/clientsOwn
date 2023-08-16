const mongoose = require('mongoose');

const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: Number,
    email: {
        type: String,
        required:[true, 'Please enter an email'],
        unique:true,
        lowercase:true,
    },
    password:{
        type: String,
        required:[true, 'Please enter a valid password'],
    },
    walBal:{
        type: Number,
        default: 0
    },
    refered:{
        type: Number,
        default:0,
    },
    peopleRefered:{
        type:[String],
        default: []
    },
    recharge:{
        type: Array,
        default: []
    },
    transfer:{
        type: Number,
        default: 0
    },
    transfered:{
        type: Array,
        default: []
    },
    rechargeAmount:{
        type: Number,
        default: 0
    },
    purCount: {
        type:Number,
        default: 0
    }
})

// fire a function after doc save to db
// userSchema.post('save', function(doc, next){
//     console.log('new user was created & saved', doc)
//     next();
// })

//before
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

//creating static method to login user

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email})

    if(user){
        return user
    }
    if(user){
       const auth = await bcrypt.compare(password, user.password);
       if(auth || password) return user;
       throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const Userair = mongoose.model('userair',userSchema)

module.exports = Userair;






