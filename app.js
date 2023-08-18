let express = require('express');
let mongoose = require('mongoose')

let app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config()

const ObjectId = require('mongoose').Types.ObjectId;

const PORT = process.env.PORT

mongoose.set('strictQuery',false)

app.set('view engine', 'ejs')

app.use('/assets', express.static('assets'))
app.use('/best/assets', express.static('assets'))
app.use(express.json())
app.use(cookieParser())

 const dbURI = 'mongodb+srv://admin12234:1234@cluster0.9o1bfvd.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
    app.listen(PORT) 
    console.log(`listening on port ${PORT}`)
})
.catch((err)=>console.log(err))


const authRoute = require('./routes/authUsers');
const buy = require('./routes/buy')
const fundUsers = require('./routes/fundUsers')
const fetchdat = require('./routes/fetchdat')
const updata = require('./routes/updata')

const adminup = require('./routes/admin');
const { render } = require('ejs');


app.get('/ref/:id', async (req, res, next) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        const User = require('./model/airUser')
        const user = await User.findById(id);
        if(user){
            res.cookie('ref', id, {httpOnly: true, maxAge:1000*60})
            res.redirect('welc')
        }
    } else {
      // Move on to the next middleware function
      next()
    }
  });

  app.get('/welc',(req,res)=>{
    try {
        res.render('welc')
    } catch (error) {
     res.status(500).json({message:err.message})   
    }
})

app.get('/man',(req,res)=>{
    res.render('manUp')
})


app.use(adminup)
app.use(fetchdat) 

app.get('/getatmdet',(req,res)=>{
    res.render('atmdet')
})
app.get('/bankdet',(req,res)=>{
    res.render('bankdeg')
})


app.use(authRoute)

app.use(updata)

app.get('/upadmin',(req,res)=>{
    res.render('accwa')
})


app.use(require('./middleware/authMiddleware').requireAuth)
app.use(require('./middleware/authMiddleware').clearFalseRef)
app.use(require('./middleware/authMiddleware').checkUser)

app.use(buy)
app.use(fundUsers)


app.get('/rech',require('./middleware/fundMiddleware').rechAvailable, (req,res)=>{
    res.render('rech')
})
app.get('/trans',require('./middleware/fundMiddleware').transAvailable, (req,res)=>{
    res.render('trans')
})

app.post('/appr',require('./middleware/fundMiddleware').approveFund)
app.post('/rppr',require('./middleware/fundMiddleware').rejectFund)
app.post('/trans',require('./middleware/fundMiddleware').approveTrans)
app.get('/welcome',(req,res)=>{
    res.render('ini')
})

app.get('/',(req,res)=>{
    try {
        res.render('index')
    } catch (error) {
     res.status(500).json({message:err.message})   
    }
})

app.get('/rewardp',(req,res)=>{
    res.render('refp')
})


app.get('/best/purchase/data',(req,res)=>{
    try {
        
        res.render('buy')
    } catch (error) {
     res.status(500).json({message:err.message})   
    }
})

app.get('/best/purchase/air',(req,res)=>{
    try {
        res.render('buyair')
    } catch (error) {
     res.status(500).json({message:err.message})   
    }
})

app.get('/best/fund',(req,res)=>{
    try {
        res.render('fund')
    } catch (error) {
     res.status(500).json({message:err.message})   
    }
})

app.get('/best/partnership',(req,res)=>{
    res.render('partner')
})

app.get('/best/referral',(req,res)=>{
    res.render('refer')
})

app.get('/best/withdraw',(req,res)=>{
    res.render('withdraw')
})

app.get('/best/fund/recharge',(req,res)=>{
    res.render('fund/fundMethod/recharge')
})

app.get('/best/fund/bank',(req,res)=>{
    res.render('fund/fundMethod/bank')
})

app.get('/best/fund/atm',(req,res)=>{
    res.render('fund/fundMethod/atm')
})

app.get('/tos',(req,res)=>{
    res.render('tos')
})


app.all('/*',(req,res)=>{
   
    if(req.cookies.jwt){
        res.redirect('/')
    }
    else res.redirect('/login')
   
})


