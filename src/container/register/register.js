import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import hocForm from '../../component/hoc-form/hoc-form'
import {register} from '../../redux/user.redux'
import Logo from '../../component/logo/logo'

@connect(
	state => state.user,
	{ register }
)

@hocForm
class Register extends React.Component {
	constructor(props) {
		super(props)
		this.handleRegister = this.handleRegister.bind(this)
	}

	handleRegister(e) {
		this.props.register(this.props.state)
	}

	render() {
		const RadioItem = Radio.RadioItem
		console.log(this.props)
		return(
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{this.props.msg ? <p className="error-msg">{this.props.msg}</p>:null}
						<InputItem
							onChange={(v) => {this.props.handleChange('user', v)}}
						>用户名</InputItem>
						<InputItem
							type="password"
							onChange={(v) => {this.props.handleChange('pwd', v)}}
						>密码</InputItem>
						<InputItem
							type="password"
							onChange={(v) => {this.props.handleChange('repeatpwd', v)}}
						>确认密码</InputItem>
						<RadioItem 
							name="selectType"
							checked={this.props.state.type === 'boss'}
							onClick={() => {this.props.handleChange('type', 'boss')}}
						>
							Boss
				        </RadioItem>
						<RadioItem 
							name="selectType"
							checked={this.props.state.type === 'genius'}
							onClick={() => {this.props.handleChange('type', 'genius')}}
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