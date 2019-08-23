import {create} from 'mobx-persist'

import ApplicationStore from './application.store';
import GameStore from './game.store';


const hydrate = create({
	jsonify: false
});

const stores = {
	ApplicationStore,
	GameStore
};

hydrate('GameStore', stores.GameStore);

export default {
	...stores
}

