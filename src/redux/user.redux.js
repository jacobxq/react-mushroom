const AUTH_SUCCESS = 'AUTH_SUCCESS'

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
		default:
			return state
	}
}

export function login() {
	console.log(1);
}