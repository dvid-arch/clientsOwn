
const User = require('../model/airUser')

const pageSize = 20

//returns details from a certain page size
module.exports.get_user_details = async(req,res)=>{
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
