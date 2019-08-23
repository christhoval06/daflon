import React, {Component} from 'react';
import {Card, CardBody, Container} from 'reactstrap';
import {inject, observer} from 'mobx-react';
import Particles from 'react-particles-js';

import {HEIGHT, WIDTH} from '../configurations';

@inject('ApplicationStore') @observer
class GameScreen extends Component {
	render() {
		const {ApplicationStore} = this.props;
		return (

			<div className="App">
				<Particles params={ApplicationStore.particles}
						   canvasClassName="particles"
						   width={WIDTH}
						   height={HEIGHT}/>

				<Container className="main-container d-flex">
					<Card className="main-screen align-self-center">
						<CardBody>
							<header className="App-header">
								<h1 className="App-title">{ApplicationStore.appName}</h1>
							</header>
							<p className="App-intro">
								To get started, edit <code>src/App.js</code> and save to reload.
							</p>
						</CardBody>
					</Card>
				</Container>

			</div>
		);
	}
}

export {GameScreen};
