import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Routes } from '@angular/router';

/**
 * The params that you can set to adapt this module to your requirements
 */
export interface IRouterConfig<T> {
    httpRequest: {
        url: string;
        method: 'GET' | 'POST';
        options?: HttpRequestOptions
    };
    callback?: (httpResponse: T) => Routes;
}

export class HttpRequestOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    body?: {
        [key: string]: any;
    };
    observe?: 'body';
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
