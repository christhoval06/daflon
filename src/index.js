import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "mobx-react";

import './styles/main.css';

import registerServiceWorker from './registerServiceWorker';

import {App} from './screens';
import Store from "./stores";

ReactDOM.render(
	(
		<Provider {...Store}>
			<App/>
		</Provider>
	), document.getElementById('root'));
registerServiceWorker();
