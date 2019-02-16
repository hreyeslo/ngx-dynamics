import { InjectionToken } from '@angular/core';

import { RouterService } from './router.service';
import { IRouterConfig } from './router.model';

/**
 * The InjectionToken that contains the options provided from the app.
 */
export const CONFIG = new InjectionToken<string>('CONFIG');

/**
 * This factory function is the responsible to run the init function
 * that configure dynamically the app router.
 * @param routerService RouterService reference
 * @param options The router config options received from the app
 */
export const DynamicRouterFactory = <T>(
    routerService: RouterService,
    options: IRouterConfig<T>
) => () => routerService.init(options);
