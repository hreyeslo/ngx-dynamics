import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IRouterConfig } from './router.model';

/**
 * This class contain all of the methods that setting dynamically the routerService of the app
 */
@Injectable()
export class RouterService {

  constructor(
    private injector: Injector,
    private httpClient: HttpClient
  ) { }

  /**
   * This method init the process that configure dynamically the router of the app
   * @param config The required config that use to configure this service
   */
  init(config: IRouterConfig): Promise<any> {
    console.log(config);
    return Promise.resolve();
  }


}
