import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Col, Row} from "reactstrap";

import {ReelModel} from "../models";
import {ReelComponent} from "../components";
import {API} from "../api";

@inject('GameStore') @observer
class MachineScreen extends Component {

	constructor() {
		super();
		this.state = {debug: false, message: 'Try your luck.'};
		this.spin.bind(this);
		this.spinAll.bind(this);
		this.toggleDebugMode.bind(this);
	}

	componentDidMount() {
		this.reels = [this.refs.reel1, this.refs.reel2, this.refs.reel3];
	}

	toggleDebugMode(e) {
		this.setState({debug: !this.state.debug});
	}

	spinAll(e) {
		// ignore requests to play before the reels are done spinning
		if (this.reels.some(r => r.spinning)) {
			e.preventDefault();
			return;
		}
		this.setState({message: 'Reeeeeeling...'});
		// `spin` returns the type result of the spin
		// if all the reels produced the same type
		// then we have a winner
		const types = this.reels.map(this.spin);

		// e.g. types[0] === types[1] && types[0] === types[2]
		const winner = new Set(types).size === 1;

		if (winner) {
			this.reels.forEach(r => r.setWinner());
		}

		setTimeout(() => {
			console.log('question', API.getQuestionBy('doctor', 'doctor'));
			// console.log('question', API.getQuestionBy(types[0], this.props.GameStore.userType));

			this.setState({
				message: winner ?
						 'Lucky you, jackpot! You get ' + types[0] + '.' :
						 'Better luck next time, try again!'
			});
		}, 5500);
	}

	spin(reel) {
		// random number 0...19
		reel.spin(Math.floor(Math.random() * reel.props.numItems));
		return reel.currentType;
	}

	render() {
		return (
			<div className="machine-screen align-self-center">
				<Row tag={'nav'}>
					<h1>Casino Daflon</h1>
				</Row>
				<Row className="actions">
					<Col tag={'h4'} md={7}>{this.state.message}</Col>
					<Col md={5}>
						<Button color="primary" className={'float-right button-play'}
								onClick={this.spinAll.bind(this)}>Jugar</Button>
						<Button color={this.state.debug ? 'primary' : 'default'} className={'float-right'}
								onClick={this.toggleDebugMode.bind(this)}>Debug Mode
						</Button>
					</Col>
				</Row>
				<Row className={'slot-machine ' + (this.state.debug ? 'debug' : '')}>
					<Col md={12}>
						<Row>
							<ReelComponent ref="reel1" debug={this.state.debug} numItems={10} items={[
								new ReelModel('bonus', 'Bonus', '/images/reel/bonus.png'),
								new ReelModel('doctor', 'Doctor', '/images/reel/doctor.png'),
								new ReelModel('daflon', 'Daflon', '/images/reel/daflon.png')]}/>

							<ReelComponent ref="reel2" debug={this.state.debug} numItems={10} items={[
								new ReelModel('daflon', 'Daflon', '/images/reel/daflon.png'),
								new ReelModel('bonus', 'Bonus', '/images/reel/bonus.png'),
								new ReelModel('doctor', 'Doctor', '/images/reel/doctor.png')]}/>

							<ReelComponent ref="reel3" debug={this.state.debug} numItems={10} items={[
								new ReelModel('bonus', 'Bonus', '/images/reel/bonus.png'),
								new ReelModel('daflon', 'Daflon', '/images/reel/daflon.png'),
								new ReelModel('doctor', 'Doctor', '/images/reel/doctor.png')]}/>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export {MachineScreen};
