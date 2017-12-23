import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import hocForm from '../../component/hoc-form/hoc-form'
import { login } from '../../redux/user.redux'
import Logo from '../../component/logo/logo'

@connect(
	state => state.user,
	{ login }
)
@hocForm
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.handleRegister = this.handleRegister.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}

	handleRegister() {
		this.props.history.push('/register')
	}

	handleLogin() {
		this.props.login(this.props.state)
	}

	render() {
		return(
			<div>
				{this.props.redirectTo && this.props.redirectTo !== this.props.location.pathname ? <Redirect to={this.props.redirectTo}></Redirect> : null}
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
						<InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
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