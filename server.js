const dotenv = require('dotenv')
//configure .env file
dotenv.config()

//import packages
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');



//create app
const app = express()
app.use(cors())
//bring in variables from .env file
const PORT = process.env.PORT
const DEV_URI = process.env.DEV_DB

//bring in routers
const adminRouter = require('./routers/adminRouter')
const articleRouter = require('./routers/articleRouter')
const checklistRouter = require('./routers/checklistRouter')
const learningPathRouter = require('./routers/learningPathRouter')
const contentRouter = require('./routers/contentRouter')
const registerRouter = require('./routers/registerRouter') //remove before deployment
const verifyRouter = require('./verifyRouter');
const loginRouter = require('./routers/loginRouter');
const gameRouter = require('./routers/gameRouter')
const fileRouter = require('./routers/fileRouter');
const testRouter = require('./routers/testRouter');

//db connection
mongoose.connect(DEV_URI).then(() => {
    console.log('Connected to Development Database')
})
.catch(err => {
    console.error(err)
})

//app.use('/')
app.use('/admin', adminRouter)
app.use('/articles', articleRouter)
app.use('/checklists', checklistRouter)
app.use('/learning-paths', learningPathRouter)
app.use('/content', contentRouter)
app.use('/register', registerRouter)
app.use('/isAdminAuth', verifyRouter)
app.use('/login', loginRouter)
app.use('/games', gameRouter)
app.use('/file', fileRouter)
app.use('/test', testRouter)

const Schema = mongoose.Schema
const demo = mongoose.model('demo', new Schema({ message: String }))
app.get('/demo', (req, res) => {
    demo.find().then(entries => {
        res.status(211).json(entries)
    })
})


  
//set app to listen on port in .env file
app.listen(PORT, () => {
    console.log(`Server Running ${PORT}`)
})



