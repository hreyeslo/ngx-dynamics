import { NgModule, ModuleWithProviders, APP_INITIALIZER, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { INgxDynamicsConfig, INgxDynamicsProviders, INgxDynamicsFactryDeps, FACTORY_DEPS } from './ngx-dynamics.model';
import { NgxDynamicsFactory } from './ngx-dynamics.factory';
import { each as _each, omitBy as _omitBy, isNull as _isNull } from 'lodash';

import { RouterService } from './services/router/router.service';
import { LoggerService } from './services/logger/logger.service';
import { CacheService } from './services/cache/cache.service';
import { I18nService } from './services/i18n/i18n.service';

@NgModule({
	imports: [HttpClientModule],
	exports: []
})
export class NgxDynamicsModule {
	static forRoot(config: INgxDynamicsConfig): ModuleWithProviders {
		let factoryDeps: INgxDynamicsFactryDeps = { config };
		const moduleProviders: Provider[] = [];

		if (config && config.enableServices) {
			const providers: INgxDynamicsProviders = {
				router: null,
				cache: null,
				i18n: null,
				logger: null
			};
			_each(config.enableServices, (enable, service) => {
				if (typeof enable === 'boolean' && enable) {
					switch (service) {
						case 'router':
							providers.router = RouterService;
							moduleProviders.push({ provide: RouterService, useClass: RouterService });
							break;
						case 'cache':
							providers.cache = CacheService;
							moduleProviders.push({ provide: CacheService, useClass: CacheService });
							break;
						case 'i18n':
							providers.i18n = I18nService;
							moduleProviders.push({ provide: I18nService, useClass: I18nService });
							break;
						case 'logger':
							providers.logger = LoggerService;
							moduleProviders.push({ provide: LoggerService, useClass: LoggerService });
							break;
					}
				}
			});
			factoryDeps = Object.assign(factoryDeps, { providers: _omitBy(providers, _isNull) });
		}

		moduleProviders.unshift({
			provide: FACTORY_DEPS,
			useValue: factoryDeps
		});

		moduleProviders.push({
			provide: APP_INITIALIZER,
			useFactory: NgxDynamicsFactory,
			deps: [FACTORY_DEPS],
			multi: true
		});

		return {
			ngModule: NgxDynamicsModule,
			providers: moduleProviders
		};
	}
}
