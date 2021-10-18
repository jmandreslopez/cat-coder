import { Callbacks } from './callbacks.model';

/**
 * HttpRequestMethod Enum
 */
export enum HttpRequestMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
}

/**
 * HttpRequestHeaders Model
 */
export interface HttpRequestHeaders {
    [header: string]: any;
}

/**
 * HttpRequestParams Model
 */
export interface HttpRequestParams {
    [param: string]: any;
}

/**
 * HttpRequestWithCallback Model
 */
export class HttpRequest {
    method: HttpRequestMethod;
    url: string;
    params: HttpRequestParams;
    body: any;
    headers: HttpRequestHeaders;
    callbacks: Callbacks = {};
    debug?: boolean = false; // Debug request
    timestamp?: number;
    options?: any = {};
}
