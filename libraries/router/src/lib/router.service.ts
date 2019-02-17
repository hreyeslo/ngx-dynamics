import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes, Router } from '@angular/router';

import { IRouterConfig } from './router.model';
import {
  get as _get,
  omit as _omit,
  flattenDeep as _flattenDeep,
  trimStart as _trimStart,
  merge as _merge
} from 'lodash';

/**
 * This class contain all of the methods that setting dynamically the routerService of the app
 */
@Injectable()
export class RouterService {

  /**
   * This is the current global config, provided by the app
   */
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
        .then((response: T | Routes) => {
          const routes: Routes = _get(this.config, ['callback']) ? this.config.callback(response as T) : response as Routes;
          this.injector.get(Router).resetConfig(this.makeFlattenRoutesTree(routes));
          resolve(true);
        })
        .catch((error: Error) => {
          console.error(error);
          resolve(false);
        });
    });
  }

  /**
   * This method makes a flatten structure from mapped routes and save it own hierarchy
   * @param routes mapped routes
   * @param parentPath The path of his parent
   */
  private makeFlattenRoutesTree(routes: Routes, parentPath: string = ''): Routes {
    const flattenRoutes: Routes = [];
    routes.forEach(route => {
      if (route.path && (route.loadChildren || route.component || (route.redirectTo && route.pathMatch))) {
        let childRoutes: Routes = [];
        route.path = _trimStart(`${parentPath}/${_trimStart(route.path, '/')}`, '/');
        route.data = _merge({
          hierarchy: route.path.split('/').filter(path => path !== '' && path !== null && path !== undefined)
        }, route.data || {});
        if (_get(route, ['children'])) {
          childRoutes = this.makeFlattenRoutesTree(route.children, route.path);
        }
        flattenRoutes.push([_omit(route, ['children'])].concat(childRoutes) as any);
      }
    });
    return _flattenDeep(flattenRoutes);
  }

}
