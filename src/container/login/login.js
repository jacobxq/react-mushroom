import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

import Logo from '../../component/logo/logo'

class Login extends React.Component {
	render() {
		return(
			<div>
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem>用户名</InputItem>
						<InputItem>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button type="primary">登陆</Button>
					<WhiteSpace />
					<Button type="primary">注册</Button>
				</WingBlank>

			</div>
		)
	}
}

export default Login