import React from 'react'
import {connect} from 'react-redux'
import { NavBar} from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'

import Boss from '../boss/boss'
import Genius from '../genius/genius'
import NavLinkBar from '../navlink/navlink'

function Msg() {
	return <div>消息列表</div>
}
function Me() {
	return <div>个人中心</div>
}
@connect(
	state =>state
)

class DashBoard extends React.Component {
	render() {
		const {pathname} = this.props.location
		const user = this.props.user
		const navList = [
			{
				path: '/boss',
				text: '牛人',
				icon: 'boss',
				title: '牛人列表',
				component: Boss,
				hide: user.type === 'genius'
			},
			{
				path: '/genius',
				text: 'boss',
				icon: 'job',
				title: 'BOSS列表',
				component: Genius,
				hide: user.type === 'boss'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
			},
			{
				path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: Me
			}
		]

		return (
			<div>
				<NavBar
			      mode="dark"
			      className="fixd-header"
			    >{navList.find(v => v.path === pathname).title}</NavBar>
				<div style={{marginTop: 45}}>
					<Switch>
						{navList.map(v => (
							<Route key={v.path} path={v.path} component={v.component}></Route>
						))}
					</Switch>
				</div>
				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}
}

export default DashBoard
