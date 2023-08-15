const Admin = require('../model/adminInfo')

module.exports.admin_post = async(req,res)=>{
    

    const { phone,walink,bank,accno,accname, } = req.body;
    
    try {
        let thisAdmin = await Admin.findOne({})

        if(phone) thisAdmin.phone = phone
        if(walink) thisAdmin.walink = walink;
        if(bank) thisAdmin.bank = bank;
        if(accno) thisAdmin.accno = accno;
        if(accname) thisAdmin.accname = accname;
        
        await thisAdmin.save();
        const check = await Admin.findOne({});
console.log(check)
         res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
}