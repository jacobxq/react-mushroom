import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
import { connect } from 'react-redux'

import {register} from '../../redux/user.redux'
import Logo from '../../component/logo/logo'

@connect(
	state => state.user,
	{ register }
)

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: '',
			pwd: '',
			repeatpwd: '',
			type: 'boss'
		}

		this.handleRegister = this.handleRegister.bind(this)
	}

	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}

	handleRegister(e) {
		this.props.register(this.state)
	}

	render() {
		const RadioItem = Radio.RadioItem
		console.log(this.props)
		return(
			<div>
				<Logo></Logo>
				<WingBlank>
					<List>
						{this.props.msg ? <p className="error-msg">{this.props.msg}</p>:null}
						<InputItem
							onChange={(v) => {this.handleChange('user', v)}}
						>用户名</InputItem>
						<InputItem
							type="password"
							onChange={(v) => {this.handleChange('pwd', v)}}
						>密码</InputItem>
						<InputItem
							type="password"
							onChange={(v) => {this.handleChange('repeatpwd', v)}}
						>确认密码</InputItem>
						<RadioItem 
							name="selectType"
							checked={this.state.type === 'boss'}
							onClick={() => {this.handleChange('type', 'boss')}}
						>
							Boss
				        </RadioItem>
						<RadioItem 
							name="selectType"
							checked={this.state.type === 'genius'}
							onClick={() => {this.handleChange('type', 'genius')}}
						>
							牛人
				        </RadioItem>
					</List>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
				</WingBlank>

			</div>
		)
	}
}

export default Register