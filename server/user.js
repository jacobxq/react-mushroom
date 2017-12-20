const express = require('express')
const utils = require('utility')

const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd': 0, '__v': 0}

const Router = express.Router()

Router.get('/list', (req, res) => {
	// User.remove({},function(e,d){})
	User.find({}, (err, doc) => {
		console.log(doc)
		return res.json(doc)
	})
})

Router.get('/info', (req, res) => {
	const { userid } = req.cookies
	if (!userid) {
		return res.json({code: 1})
	}
	User.findOne({_id: userid}, _filter, (err, doc) => {
		if (err) {
			return res.json({code: 1, msg: '服务器出错'})
		}
		if (doc) {
			return res.json({code: 0, data: doc})
		}
		return res.json({code: 1, msg: '还没登陆'})
	})
})

Router.post('/update', (req, res) => {
	const {userid} = req.cookies
	const body = req.body
	console.log(body)
	
	if (!userid) {
		return res.json({code: 1})
	}

	User.findByIdAndUpdate(userid, body, (err, doc) => {
		const data = Object.assign({}, {
			user: doc.user,
			type: doc.type
		}, body)
		return res.json({code: 0, data})
	})
})

Router.post('/login', (req, res) => {
	const {user, pwd} = req.body
	User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
		if (!doc) {
			return res.json({code: 1, msg: '用户名或密码错误'})
		}
		res.cookie('userid', doc._id)
		return res.json({code: 0, data: doc})
	})
})

Router.post('/register', (req, res) => {
	const {user, pwd, type} = req.body
	User.findOne({user}, (err, doc) => {
		if (doc) {
			return res.json({code: 1, msg: '该用户已经存在'})
		}

		const userModel = new User({user, type, pwd: md5Pwd(pwd)})
		userModel.save((e, d) => {
			if (e) {
				return res.json({code: 1, msg: '后端出错了'})
			}

			const {user, type, _id } = d
			res.cookie('useid', _id)
			return res.json({code: 0, data: {user, type, _id}})
		})
	})
})

function md5Pwd(pwd){
	const salt = 'wqefrsadfdsaswoxihuanniliangxinxia!@#IUHJh~~'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router