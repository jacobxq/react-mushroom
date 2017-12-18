const express = require('express')
const utils = require('utility')

const model = require('./model')
const User = model.getModel('user')

const Router = express.Router()

Router.get('/list', (req, res) => {
	User.find({}, (err, doc) => {
		console.log(doc)
		return res.json(doc)
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