import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {inject, observer} from 'mobx-react';
import Particles from 'react-particles-js';

import {HEIGHT, WIDTH} from '../configurations';
import {SplashScreen} from "./splash.screen";

import rays from '../assets/rays.png';
import circleRays from '../assets/circle-rays.png';
import {SelectorScreen} from "./selector.screen";
import {MachineScreen} from "./machine.screen";

@inject('ApplicationStore', 'GameStore') @observer
class App extends Component {
	render() {
		const {ApplicationStore, GameStore} = this.props;

		console.log('userType', GameStore.userType);

		const containerClass = [
			'main-container',
			'd-flex',
			['selector', 'machine'].includes(GameStore.screen) ? 'flex-column' : '',
			'justify-content-center'
		];
		return (
			<div className="App">
				<Particles params={ApplicationStore.particles}
						   canvasClassName="particles"
						   width={WIDTH}
						   height={HEIGHT}/>
				<div className="rays" style={{backgroundImage: `url(${rays})`}}/>
				<div className="circle-rays" style={{backgroundImage: `url(${circleRays})`}}/>
				<Container className={containerClass.join(' ')}>
					{['splash', 'selector'].includes(GameStore.screen) && <SplashScreen/>}
					{['selector'].includes(GameStore.screen) && <SelectorScreen/>}
					{['machine'].includes(GameStore.screen) && <MachineScreen/>}
				</Container>

			</div>
		);
	}
}

export {App};
