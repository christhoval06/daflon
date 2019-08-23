const rewireMobX = require('react-app-rewire-mobx');

/* config-overrides.js */
module.exports = (config, env) => {
	config = rewireMobX(config, env);
	return config;
};

// https://codepen.io/jzmmm/pen/XKGOJk
