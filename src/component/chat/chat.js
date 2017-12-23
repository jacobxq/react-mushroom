import React from 'react'
import {List, InputItem, NavBar, Icon} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {sendMsg, getMsgList, recvMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

const socket = io('ws://localhost:8900')

@connect(
	state => state,
	{sendMsg, getMsgList, recvMsg}
)

class Chat extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			text: '',
			msg: []
		}
	}

	componentDidMount() {
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg();
		}
	}

	handleSubmit() {
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		this.props.sendMsg({from, to, msg})
		this.setState({
			text: ''
		})
	}

	render() {
		const userid = this.props.match.params.user
		const users = this.props.chat.users
		if (!users[userid]) {
			return null
		}
		const chatid = getChatId(userid, this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid === chatid)
		return (
			<div id="chat-page">
				<NavBar 
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => {
						this.props.history.goBack()
					}}
				>
					{users[userid].name }
				</NavBar>
				<div style={{height: 44}}></div>
				
				{chatmsgs.map(v=> {
					const avator = require(`../img/${users[v.from].avator}.png`)
					return v.from === userid ? (
						<List key={v._id}>
							<List.Item
								thumb={avator}
							>{v.content}</List.Item>
						</List>
					):(
						<List key={v._id}>
							<List.Item 
								className="chat-me"
								extra={<img src={avator} alt=""/>}
							>
							{v.content}</List.Item>
						</List>
					)
				})}
				<div style={{height: 44}}></div>
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange={(v) => {
								this.setState({text: v})
							}}
							extra={<span onClick={() => this.handleSubmit()}>发送</span>}
						></InputItem>
					</List>
				</div>
			</div>
		)
	}
}

export default Chat