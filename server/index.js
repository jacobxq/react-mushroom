const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express()

// socket.io work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {

	socket.on('sendmsg', (data) => {
		const {from, to, msg} = data
		const chatid = [from, to].sort().join('_')
		Chat.create({chatid, from ,to, content: msg}, (err, doc) => {
			io.emit('recvmsg', Object.assign({}, doc._doc))
		})
	})
})

const userRouter = require('./user')


app.disable('etag');
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)

app.get('/', (req, res) => {
	res.send('hello world')
})

server.listen(8900, () => {
	console.log('node app start at port 8900')
})
