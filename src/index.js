import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers/";
import { Provider } from 'react-redux';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
		reducer,
		composeEnhancers(
			applyMiddleware(logger)
		)
	);

console.log('store',store.getState())

ReactDOM.render(
	<Provider store={ store }>
			<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
