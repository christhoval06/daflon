import {observable} from 'mobx';
import {ParticleNasaConfig} from '../configurations';

class ApplicationStore {
	@observable appName = "Casino Daflón";
	@observable particles = ParticleNasaConfig;
	@observable splashTimer = 5;
	@observable questionTimeUp = 30;
	@observable rainCoinsTimer = 10;
}

export default new ApplicationStore();
