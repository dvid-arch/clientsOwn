
const User = require('../model/airUser')

module.exports.recharge_post = async(req,res)=>{
    let {user,amount,network,recharge} = req.body;
   
    try {
        let thisUser = await User.findOne({email:user})
        if(thisUser){
            thisUser.recharge.push([amount, network, recharge])
            await thisUser.save()
        }
    res.sendStatus(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

module.exports.transfer_post = async(req,res)=>{
    let {user,amount} = req.body;
    
    try {
        let thisUser = await User.findOne({email:user})
        console.log(thisUser)
        thisUser.transfer += 1;
        thisUser.transfered.push(amount);
        await thisUser.save()
        console.log(thisUser);
        res.sendStatus(200)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
        
    
}
module.exports.up_amt = async(req,res)=>{
    let {phone,amt} = req.body;
    console.log(phone,amt)
    try {
        let thisUser = await User.findOne({email:String(phone)})
        console.log(thisUser)
        thisUser.walBal +=amt
               
        await thisUser.save()

        console.log(thisUser);
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
        
    
}