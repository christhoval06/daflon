import {action, observable} from 'mobx';
import {persist} from 'mobx-persist'

// https://codepen.io/zpipe07/pen/YpWaOY
// https://codepen.io/antibland/pen/ypagZd

class GameStore {
	@persist('list') @observable userTypes = [{
		key : 'surgeon',
		name: 'Cirujano',
		icon: require('../assets/user-types/cirujano.png')
	}, {
		key : 'proctologist',
		name: 'Proctólogo / Gastroenterólogo',
		icon: require('../assets/user-types/proctologo.png')
	}, {
		key : 'doctor',
		name: 'Medicina General',
		icon: require('../assets/user-types/general.png')
	}];

	@persist('list') @observable questions = [];

	@persist @observable points = 0;
	@persist @observable success = 3;
	@persist @observable failure = -1;

	@observable questionCounter = 6;
	@observable answers = 0;

	@persist @observable userType = null;
	@persist @observable userSelected = false;

	@observable screen = "splash";

	@action
	setQuestions = (id) => {
		this.questions.push(id);
	};

	@action
	setUserType = (userType) => {
		this.userType = userType;
		this.userSelected = true;
		this.screen = "machine";
	};

	@action
	resetGame = () => {
		this.userType = null;
		this.userSelected = false;
		this.screen = "splash";
	}
}

export default new GameStore();
