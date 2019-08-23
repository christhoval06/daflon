import React, {Component} from 'react'
import PropTypes from 'prop-types';

class CountDownElement extends Component {
	static propTypes = {
		seconds   : PropTypes.number,
		stop      : PropTypes.bool,
		display   : PropTypes.bool,
		onComplete: PropTypes.func,
		onStop    : PropTypes.func
	};

	state = {
		endTime  : 0,
		remaining: 0,
		isRun    : false
	};

	componentDidMount() {
		const {seconds} = this.props;
		this.setState({
			endTime  : new Date().getTime() + (1000 * seconds),
			remaining: seconds,
			isRun    : true
		});
		this.start();
	}

	start = () => {
		this.frameId = requestAnimationFrame(this.tick)
	};

	componentWillUnmount() {
		this.stop();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.stop && this.state.isRun) {
			this.stop(true);
		}
	}

	stop = (stop = false) => {
		this.setState({isRun: false});
		if (stop) {
			this.props.onStop(this.state.remaining);
		}
		cancelAnimationFrame(this.frameId);
	};

	tick = () => {
		const {endTime} = this.state;

		const remainingTime = this.getRemainingTime(endTime);

		if (remainingTime <= 0) {
			this.stop();
			this.props.onComplete();
			return;
		}

		this.setState(
			{remaining: (remainingTime / 1000) % 60},
			() => this.frameId = requestAnimationFrame(this.tick)
		);
	};

	getRemainingTime = deadline => deadline - (new Date().getTime());

	pad = (value) => ('0' + Math.floor(value)).slice(-2);

	render() {
		const {display} = this.props;
		const {remaining} = this.state;

		return display ? (
			<b>{this.pad(remaining)}</b>
		) : null;
	}
}

export {CountDownElement}
