const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone:String,
    walink:String,
    bank:String,
    accno:String,
    accname:String,
})

const Admininfo = mongoose.model('admininfo',userSchema)

module.exports = Admininfo