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

class BossInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			desc: '',
			money: '',
			company: ''
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
				<NavBar mode="dark">BOSS完善信息页</NavBar>
				<AvatorSelector
					selectAvator={(imagename) => {
						this.setState({
							avator: imagename
						})
					}}
				></AvatorSelector>
					<InputItem onChange={v => this.handleChange('title', v)}>招聘职位</InputItem>
					<InputItem onChange={v => this.handleChange('company', v)}>公司名称</InputItem>
					<InputItem onChange={v => this.handleChange('money', v)}>职位薪资</InputItem>
					<TextareaItem 
						onChange={v => this.handleChange('desc', v)}
						rows={3}
						autoHeight
						title="职位要求"
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

export default BossInfo