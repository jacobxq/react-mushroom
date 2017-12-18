import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { 
	BrowserRouter, 
	Route, 
	Redirect,
	Switch
} from 'react-router-dom'
import reducers from './reducer'

import Login from './container/login/login'
import Register from './container/register/register'

import './index.css'
import './config'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => {}

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	reduxDevtools
))


ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login}></Route>
				<Route path="/register" component={Register}></Route>
			</Switch>
			</BrowserRouter>
		</Provider>
	),
	document.getElementById('root')
)