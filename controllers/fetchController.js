
const User = require('../model/airUser')
const pageSize = 20

module.exports.get_atm_details = async(req,res)=>{
    let {page} = req.body;
    
   
    try {
        let thisUser = await User.find().skip(page*pageSize).limit(pageSize);
        
        console.log(thisUser)
        res.status(200).json({thisUser})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    } 
    
}
module.exports.getUserDet = async(req,res)=>{
    let {lastid} = req.body;
   
    try {
        let thisUser = await User.find();
      
        console.log(thisUser)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    } finally{
        thisUser.close()
    }
    
}