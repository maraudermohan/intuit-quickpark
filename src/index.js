import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import App from './components/App'
import './styles/quickpark.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const store = configureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
  document.getElementById('root')
)