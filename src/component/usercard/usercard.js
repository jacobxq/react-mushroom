import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'

class UserCard extends React.Component {
	static propTypes = {
		userlist: PropTypes.array.isRequired
	}
	render() {
		return (
			<WingBlank>
			    <WhiteSpace />
			    {this.props.userlist.map(v => (
			    	v.avator && v.desc ? <Card key={v}>
				      <Card.Header
				        title={v.user}
				        thumb={require(`../img/${v.avator}.png`)}
				        extra={<span>{v.title}</span>}
				      />
				      <Card.Body>
				        {v.type === 'boss' && v.company ? <div>公司：{v.company}</div>: null}
				        {v.desc.split('\n').map(z => (
				        	<div key={z}>{z}</div>
				        ))}
				        {v.type === 'boss' && v.money ? <div>薪资：{v.money}</div>: null}
				      </Card.Body>
				    </Card> : null
			    ))}
			    <WhiteSpace />
		  </WingBlank>
		)
	}
}

export default UserCard