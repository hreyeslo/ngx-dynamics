import { InjectionToken, Type } from '@angular/core';

/**
 * The InjectionToken that contains the options provided from the app.
 */
export const FACTORY_DEPS = new InjectionToken<INgxDynamicsFactryDeps>('FACTORY_DEPS');

/**
 * List of available providers to enable
 */
export enum ENgxDynamicsAvailableProviders {
	ROUTER = 'router',
	CACHE = 'cache',
	I18N = 'i18n',
	LOGGER = 'logger'
}

/**
 * The minimal required params to run and configure NgxDynamics module
 */
export interface INgxDynamicsConfig {
	appConfigSource: {
		url: string;
		method: 'GET' | 'POST';
	};
	enableServices?: {
		[ENgxDynamicsAvailableProviders.ROUTER]?: boolean;
		[ENgxDynamicsAvailableProviders.CACHE]?: boolean;
		[ENgxDynamicsAvailableProviders.I18N]?: boolean;
		[ENgxDynamicsAvailableProviders.LOGGER]?: boolean;
	};
	callbacks?: {
		appConfig?: () => void;
		routerConfig?: () => void;
	};
}

/**
 * The object that factory receive as a parameter
 */
export interface INgxDynamicsFactryDeps {
	config: INgxDynamicsConfig;
	providers?: INgxDynamicsProviders;
}

/**
 * This object contain the references of all injected providers
 */
export interface INgxDynamicsProviders {
	[ENgxDynamicsAvailableProviders.ROUTER]?: Type<any> | null;
	[ENgxDynamicsAvailableProviders.CACHE]?: Type<any> | null;
	[ENgxDynamicsAvailableProviders.I18N]?: Type<any> | null;
	[ENgxDynamicsAvailableProviders.LOGGER]?: Type<any> | null;
}

