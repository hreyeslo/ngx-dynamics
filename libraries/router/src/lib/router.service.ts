import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { IRouterConfig } from './router.model';
import {
  get as _get,
  omit as _omit
} from 'lodash';
import { Routes } from '@angular/router';

/**
 * This class contain all of the methods that setting dynamically the routerService of the app
 */
@Injectable()
export class RouterService {

  private config: IRouterConfig<any>;

  constructor(
    private injector: Injector,
    private httpClient: HttpClient
  ) { }

  /**
   * This method init the process that configure dynamically the router of the app
   * @param config The required config that use to configure this service
   */
  init<T>(config: IRouterConfig<T>): Promise<boolean> {
    this.config = config;
    return this.makeHttpRequest<T>();
  }

  /**
   * This method request and mapped the basic data to process
   */
  private makeHttpRequest<T>(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.config.httpRequest.method === 'GET' && _get(this.config.httpRequest, ['options', 'body'])) {
        this.config.httpRequest.options = _omit(this.config.httpRequest.options, ['body']);
      }

      this.httpClient[this.config.httpRequest.method.toLowerCase()](this.config.httpRequest.url, this.config.httpRequest.options)
        .toPromise()
        .then((response: T) => {
          const routes: Routes = this.config.callback(response);

          console.log(routes);

          resolve(true);
        })
        .catch((error: Error) => {
          console.error(error);
          resolve(false);
        });
    });
  }

}
