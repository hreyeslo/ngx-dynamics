import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DynamicRouterFactory, CONFIG } from './dynamic.factory';
import { RouterService } from './router.service';
import { IRouterConfig } from './router.model';

@NgModule({
  imports: [HttpClientModule],
  providers: [RouterService]
})
export class RouterModule {
  static forRoot<T>(config: IRouterConfig<T>): ModuleWithProviders {
    const providers = [
      {
        provide: CONFIG,
        useValue: config
      },
      {
        provide: APP_INITIALIZER,
        useFactory: DynamicRouterFactory,
        deps: [RouterService, CONFIG],
        multi: true
      }
    ];
    return {
      ngModule: RouterModule,
      providers
    };
  }
}
