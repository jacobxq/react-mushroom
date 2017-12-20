import React from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button, WingBlank, WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import { update } from '../../redux/user.redux'
import AvatorSelector from '../../component/avator-selector/avator-selector'

@connect(
	state => state.user,
	{ update }
)

class GenusiInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			desc: '',
		}
	}

	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}
	render() {
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return (
			<div>
				{redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
				<NavBar mode="dark">牛人完善信息页</NavBar>
				<AvatorSelector
					selectAvator={(imagename) => {
						this.setState({
							avator: imagename
						})
					}}
				></AvatorSelector>
					<InputItem onChange={v => this.handleChange('title', v)}>求职岗位</InputItem>
					<TextareaItem 
						onChange={v => this.handleChange('desc', v)}
						rows={3}
						autoHeight
						title="个人简介"
					></TextareaItem>
					<WhiteSpace></WhiteSpace>
				<WingBlank>
					<Button type="primary" onClick={() => {
						this.props.update(this.state)
					}}>保存</Button>
				</WingBlank>
			</div>
		)
	}
}

export default GenusiInfo