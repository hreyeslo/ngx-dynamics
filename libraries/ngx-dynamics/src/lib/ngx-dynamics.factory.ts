import { INgxDynamicsFactryDeps } from './ngx-dynamics.model';

/**
 * This factory function is the responsible to run the init function
 * that configure dynamically the app core services.
 * @param deps Provide the app config and the injected providers
 */
export const NgxDynamicsFactory = (deps: INgxDynamicsFactryDeps) => () => {
	console.log(deps);
	return Promise.resolve();
};
