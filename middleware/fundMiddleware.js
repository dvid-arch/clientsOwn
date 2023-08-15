const User = require('../model/airUser')

const approveFund = async (req, res) => {
    const { id, amount } = req.body;
    //on click approved do this
    try {
        let thisUser = await User.findById(id)

        thisUser.recharge = thisUser.recharge.filter((n, index) => index != 0)
        thisUser.walBal += amount;
        await thisUser.save();
        
         res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}

const approveTrans = async (req, res) => {
    const { id, amount } = req.body;
    //on click approved do this
    try {
        let thisUser = await User.findById(id)

        thisUser.transfer = thisUser.transfer - 1;
        thisUser.transfered = thisUser.transfered.filter((n, index) => index != 0)
        thisUser.walBal += amount;
        await thisUser.save();
        console.log(thisUser);
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }

}

const rechAvailable = async (req, res, next) => {
    const rechs = await User.find({})
    let filtered = await rechs.filter(n => n["recharge"].length > 0)
    res.locals.rech = filtered;
    next();
}

const transAvailable = async (req, res, next) => {
    const trans = await User.find({})
    let filtered = await trans.filter(n => n['transfer'] > 0)
    res.locals.trans = filtered
    next();
}

module.exports = { approveFund, rechAvailable, approveTrans, transAvailable }

// db.users.find({ "referred_people": { $size: { $gte: 1 } } })