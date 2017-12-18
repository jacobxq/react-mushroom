const express =  require('express')
const mongoose  = require('mongoose')

const app = express()

// 链接mongo 并且使用 xiaoqi 这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/xiaoqi'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
	console.log('mongo connect success')
})

const User = mongoose.model('user', new mongoose.Schema({
	name: {type: String, require: true},
	age: {type: Number, require: true}
}))

User.create({
	name: 'Xiaoqi',
	age: 18
}, (err, doc) => {
	if (!err) {
		console.log(doc)
	} else {
		console.log(err)
	}
})

// User.remove({age: 18}, (err, doc) => {
// 	if (!err) {
// 		console.log(doc)
// 	} else {
// 		console.log(err)
// 	}
// })

// User.update({'name': 'Xiaoqi'}, {'$set': {age: 20}}, (err, doc) => {
// 	if (!err) {
// 		console.log(doc)
// 	} else {
// 		console.log(err)
// 	}
// })

app.get('/', (req, res) => {
	res.send('<h1>hello world')
})

app.get('/user', (req, res) => {
	User.findOne({'name': 'Xiaoqi'}, (err, doc) => {
		res.json(doc)
	})
})

app.listen('8900', () => {
	console.log('listen at 8900')
})