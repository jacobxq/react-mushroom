import React from 'react'
import PropTypes from 'prop-types'
import { List, Grid } from 'antd-mobile'

class AvatorSelector extends React.Component {
	static propTypes = {
		selectAvator: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
							.split(',').map(v => ({
								icon: require(`../img/${v}.png`),
								text: v
							}))
		const gridHeader = this.state.icon ?
							(<div>
								<span>已选择头像</span>
								<img src={this.state.icon} style={{width: 20}} alt=""/>
							</div>)
							: <div>请选择头像</div>
		return (
			<div>
				<List renderHeader={()=>gridHeader}>
					<Grid 
						data={avatarList}
						columnNum={5}
						onClick={(elm) => {
							this.setState(elm)
							this.props.selectAvator(elm.text)
						}}
					></Grid>
				</List>
			</div>
		)
	}
}

export default AvatorSelector