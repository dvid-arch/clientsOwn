const User = require('../model/airUser')

module.exports.updateWallet = async (req, res) => {
    let { id, amount } = req.body;
    try {
        let thisUser = await User.findById(id)
      
        thisUser.walBal = thisUser.walBal - amount
        thisUser.purCount +=1;
        await thisUser.save()
        // console.log(thisUser.walBal)
        res.json({walBal:thisUser.walBal})
        
    } catch (error) {
        res.status(500).json({"message":error.message})
    }

}

module.exports.updateRefWard = async (req, res) => {
    let { id } = req.body;
    try {
        let thisUser = await User.findById(id)
    
        thisUser.refered = thisUser.refered - 29;
        await thisUser.save()
        
        res.json({walBal:thisUser.walBal})
        
    } catch (error) {
        res.status(500).json({"message":error.message})
    }

}

/* implementation is simple, just have the details correct */
/* use this to refresh node skill */

// module.exports.accWa = async (req, res) => {
//     let { id,acc,link,num } = req.body;
//     try {
//         let thisUser = await User.findOne(name)
    
//         thisUser.refered = [...thisUser.peopleRefered];
//         await thisUser.save()
        
//         res.json({walBal:thisUser.walBal})
        
//     } catch (error) {
//         res.status(500).json({"message":error.message})
//     }

// }

