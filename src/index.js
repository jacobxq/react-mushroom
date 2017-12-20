import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { 
	BrowserRouter, 
	Route, 
	Redirect
} from 'react-router-dom'
import reducers from './reducer'

import AuthRoute from './component/authroute/authroute'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'

import './config'
import './index.css'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => {}

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	reduxDevtools
))


ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Route path="/bossinfo" component={BossInfo}></Route>
				<Route path="/geniusinfo" component={GeniusInfo}></Route>
				<Route path="/login" component={Login}></Route>
				<Route path="/register" component={Register}></Route>
			</div>
			</BrowserRouter>
		</Provider>
	),
	document.getElementById('root')
)