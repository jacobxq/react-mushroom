import axios from 'axios'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
	redirectTo: '',
	msg: '',
	user: '',
	type: ''
}

export function user(state=initState, action) {
	switch(action.type) {
		case AUTH_SUCCESS:
			return {...state, msg: ''}
		case ERROR_MSG:
			console.log(111)	
			return {...state, isAuth:false, msg:action.msg}
		default:
			return state
	}
}

function errorMsg(msg) {
	return { msg, type: ERROR_MSG }
}

function authSuccess(data) {
	return {type: AUTH_SUCCESS, payload: data}
}

export function login() {
	console.log(1);
}

export function register({user, pwd, repeatpwd, type}) {
	console.log(user, pwd, repeatpwd, type)
	if (!user || !pwd || !type) {
		return errorMsg('用户名密码必须输入')
	}
	if (pwd!==repeatpwd) {
		return errorMsg('密码和确认密码不同')
	}

	return dispatch => {
		axios.post('/user/register', {user, pwd, type})
			.then(res => {
				if (res.status == 200 && res.data.code == 0) {
					dispatch(authSuccess(res.data.data))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
	
}