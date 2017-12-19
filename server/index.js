const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express()

app.disable('etag');
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)

app.get('/', (req, res) => {
	res.send('hello world')
})

app.listen(8900, () => {
	console.log('node app start at port 8900')
})
