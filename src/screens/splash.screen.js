import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import logo from '../assets/logo.png';
import {CountDownElement} from "../components/elements";

@inject('ApplicationStore', 'GameStore') @observer
class SplashScreen extends Component {
	state = {
		animated: true,
	};

	render() {
		const {ApplicationStore, GameStore} = this.props;
		const {animated} = this.state;

		const logoWidth = GameStore.screen === "splash" ? 600 : 530;
		const logoClasses = [
			animated ? "animated" : '',
			GameStore.screen === "splash" ? '' : "titled"
		];

		return (
			<div className="splash-screen align-self-center">
				<img className={logoClasses.join(' ')} src={logo} alt={ApplicationStore.appName}
					 width={logoWidth}/>
				<CountDownElement seconds={ApplicationStore.splashTimer} onComplete={this._onTimerComplete.bind(this)}/>
			</div>
		);
	}

	_onTimerComplete() {
		const {GameStore} = this.props;
		GameStore.screen = "selector";
		this.setState({animated: false});
	}
}

export {SplashScreen};
