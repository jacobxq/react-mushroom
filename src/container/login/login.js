import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../redux/user.redux'
import Logo from '../../component/logo/logo'

@connect(
	state => state.user,
	{ login }
)

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: '',
			pwd: ''
		}

		this.handleRegister = this.handleRegister.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}

	handleRegister() {
		this.props.history.push('/register')
	}

	handleLogin() {
		this.props.login(this.state)
	}

	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}

	render() {
		return(
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
						<InputItem onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleLogin}>登陆</Button>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
				</WingBlank>

			</div>
		)
	}
}

export default Login