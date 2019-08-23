import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Card, CardBody, ListGroup, ListGroupItem} from "reactstrap";

@inject('GameStore') @observer
class SelectorScreen extends Component {
	render() {
		const {GameStore} = this.props;
		return (
			<div className="selector-screen align-self-center">
				<Card>
					<CardBody>
						<ListGroup>
							{GameStore.userTypes.map(({key, name, icon}) => (
								<ListGroupItem key={key} tag="a" onClick={() => GameStore.setUserType(key)}>
									<img src={icon} alt={name}/>
									<span>{name}</span>
								</ListGroupItem>))}
						</ListGroup>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export {SelectorScreen};
