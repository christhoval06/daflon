import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Col, Row} from "reactstrap";

class ReelComponent extends Component {

	static propTypes = {
		numItems: PropTypes.number,
		debug   : PropTypes.bool
	};

	static defaultProps = {
		numItems: 5,
		debug   : false
	};

	constructor(props) {
		super();

		// props.items is the unique items on this reel
		// repeat items while less than props.numItems
		// to hold ~ 20 items per reel (configurable)

		this.items = [];

		while (props.numItems > this.items.length) {
			this.items.push(props.items[Math.floor(Math.random() * props.items.length)]);
		}

		this.currentIndex = 1;
		this.currentType = this.items[this.currentIndex].type;
		this.spinning = false;
		this.height = 0;
		this.winner = false;

		this.state = {
			items: this.items.slice(0), // copy
			style: {top: 0}
		};

		// bind method context
		[this.__offsetTop, this.__renderItems, this.spin, this.__extendReel, this.setWinner]
			.forEach(m => m.bind(this));
	}

	__offsetTop(index) {
		const dest = ReactDOM.findDOMNode(this.refs.reel)
			.querySelectorAll('.reel-item[data-index="' + index + '"]');
		// since three are visible and the middle elements where
		// it should be displayed, add one element height to the top
		return dest[0].offsetTop - 200; // 72 is a single reel-item height todo: calculate
	}

	__extendReel(fn) {
		// push another reel onto the state items
		Array.prototype.push.apply(this.state.items, this.items);
		this.setState({items: this.state.items}, (fn || (() => {
		})).bind(this));
	}

	__afterSpin() {
		// a spin leaves two reels above the newly visible elements
		// these can be cleaned up to keep the DOM light
		this.currentIndex = this.currentIndex % this.props.numItems;    // new index will be rmainder
		const newItems = this.state.items.slice(this.props.numItems * 2); // new items, [numItems*2:]

		// remove previous items
		this.setState({items: newItems}, () => {
			// preserve top position after adjustment
			const top = this.__offsetTop(this.currentIndex);
			this.setState({style: {top: -(top)}, winner: this.winner});
			this.spinning = false;
		});
	}

	__renderItems() {
		return this.state.items.map((item, index) => {
			return (
				<Row className={'reel-item ' + (this.state.winner && this.currentIndex === index ? 'winner' : '')}
					 data-type={item.type}
					 data-index={index}
					 key={index}>
					<Col md={12}>
						<img src={item.icon} alt={item.name} width={200}/>
					</Col>
				</Row>);
		});
	}

	setWinner() {
		this.winner = true;
	}

	spin(position) {
		// position is the index destination target for a single reel
		// e.g. position is between 0 (inclusive) and numItems (exclusive)
		if (this.spinning) return;

		// reset winner on new spin
		this.setState({winner: false});
		this.winner = false;

		// todo: validate position range
		this.currentType = this.items[position].type;
		this.spinning = true;

		// append items
		this.__extendReel();
		// and again for a longer spin effect
		this.__extendReel(() => {
			// spin through 2 reels before landing on the target
			const indexDelta = (this.props.numItems * 2) - this.currentIndex + position;
			const destinationIndex = this.currentIndex + indexDelta;
			const duration = Math.round(Math.random() * 3) + 3;// random duration 3-6 sec
			const top = this.__offsetTop(destinationIndex);

			// update index and start animation
			this.currentIndex = destinationIndex;
			this.setState({style: {top: -(top), transition: 'top ' + duration + 's'}}, () => {
				// cleanup after the spin animation duration completes
				setTimeout(this.__afterSpin.bind(this), duration * 1000);
			});
		});
	}

	// lifecycle methods
	render() {
		const {debug} = this.props;
		return (
			<Col md={4} className="reel-wrapper">
				{debug ? <ReelDebugComponent
					top={this.state.style.top}
					count={this.state.items.length}
					dest={this.currentIndex}
					winner={this.winner}
					type={this.currentType}/> : null}

				<div ref="reel" style={this.state.style} className="reel">
					{this.__renderItems()}
				</div>
			</Col>
		);
	}
}

class ReelDebugComponent extends Component {

	static propTypes = {
		dest  : PropTypes.number,
		count : PropTypes.number,
		top   : PropTypes.number,
		winner: PropTypes.bool,
		type  : PropTypes.string
	};

	static defaultProps = {
		dest  : 0,
		count : 0,
		top   : 0,
		winner: false,
		type  : ''
	};

	constructor(props) {
		super();
		this.state = props;
	}

	componentWillReceiveProps(props) {
		this.setState(props);
	}

	render() {
		const {type, winner, dest, count, top} = this.state;
		return (
			<div className="reel-debug">
				<ul>
					<li><label>Type</label><span>{type}</span></li>
					<li><label>Win</label><span>{winner ? 'yes' : 'no'}</span></li>
					<li><label>Index</label><span>{dest}</span></li>
					<li><label>Items</label><span>{count}</span></li>
					<li><label>Top</label><span>{top}px</span></li>
				</ul>
			</div>)
	}
}

export {
	ReelComponent,
	ReelDebugComponent
}
