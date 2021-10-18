import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpProgressEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable, Subject, Subscription } from 'rxjs';

// App
import { ConfigService } from '@app/config';
import { CustomEncoder } from '@app/encoder';
import { flatParams, serialize } from '@app/helpers';
import { Callbacks, HttpRequest, HttpRequestParams, HttpRequestMethod } from '@app/models';
import { LoggerService } from './logger.service';

@Injectable({
    providedIn: 'root'
})
export abstract class RestService implements OnInit, OnDestroy {
    private subscriptions: Array<Subscription> = [];
    private response: Subject<any> = new Subject<any>();
    private error: Subject<any> = new Subject<any>();

    constructor(private http: HttpClient,
                private router: Router,
                private configService: ConfigService,
                private customEncoder: CustomEncoder,
                private loggerService: LoggerService) {

        this.initObservables();
        this.bindObservables();

        // OnInit
        this.ngOnInit();
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    private initObservables() {
        //
    }

    private bindObservables() {
        this.subscriptions = [
            ...this.subscriptions,
        ];
    }

    private checkObservables() {
        //
    }

    private destroyObservables() {
        this.subscriptions.forEach((subscription: Subscription) => subscription?.unsubscribe());
    }

    public getResponseObservable(): Subject<any> {
        return this.response;
    }

    public getErrorObservable(): Subject<any> {
        return this.error;
    }

    //****************************************************************************************
    // HANDLERS
    //****************************************************************************************

    private handleSuccess(request: HttpRequest, response: HttpResponse<any>) {

        // DEBUG ONLY
        if (request?.debug) {
            this.loggerService.info(response);
        }

        // Share Response
        this.response?.next(response);

        // Success Callback
        request?.callbacks?.success?.(response);

        // Always callback
        this.handleAlways(request);
    }

    private handleError(request: HttpRequest, response: HttpResponse<any>) {

        // DEBUG ONLY
        if (request?.debug) {
            this.loggerService.error(response);
        }

        // Share Response
        this.error?.next(response);

        // Error callback
        request?.callbacks?.error?.(response);

        // Always callback
        this.handleAlways(request);
    }

    private handleAlways(request: HttpRequest) {

        // Always callback
        request?.callbacks?.always?.();
    }

    //****************************************************************************************
    // HTTP METHODS
    //****************************************************************************************

    public get(path: string, params: HttpRequestParams, callbacks: Callbacks = {}): any {
        const method: HttpRequestMethod = HttpRequestMethod.Get;
        const url: string = this.formatPath(path);
        const headers: any = {};
        return this.createRequest(method, url, headers, params, callbacks);
    }

    public post(path: string, params: HttpRequestParams, callbacks: Callbacks = {}): any {
        const method: HttpRequestMethod = HttpRequestMethod.Post;
        const url: string = this.formatPath(path);
        const headers: any = {};
        return this.createRequest(method, url, headers, params, callbacks);
    }

    public patch(path: string, params: HttpRequestParams, callbacks: Callbacks = {}): any {
        const method: HttpRequestMethod = HttpRequestMethod.Patch;
        const url: string = this.formatPath(path);
        const headers: any = {};
        return this.createRequest(method, url, headers, params, callbacks);
    }

    public delete(path: string, params: HttpRequestParams, callbacks: Callbacks = {}): any {
        const method: HttpRequestMethod = HttpRequestMethod.Delete;
        const url: string = this.formatPath(path);
        const headers: any = {};
        return this.createRequest(method, url, headers, params, callbacks);
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    private formatPath(path: string) {
        return `${this.configService.getApiUrl()}${path}`;
    }

    public createRequest(method: HttpRequestMethod, url: string, headers: any = {}, params: HttpRequestParams, callbacks: Callbacks = {}): any {

        // Headers
        headers = {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers,
        };

        // Params
        params = flatParams(params);

        // Request
        let request = new HttpRequest();
        request.method = method;
        request.url = url;
        request.headers = new HttpHeaders(headers);
        request.body = serialize(params);
        request.callbacks = callbacks;

        // Append params if GET request
        if (method === HttpRequestMethod.Get) {
            request.params = new HttpParams({
                fromObject: params,
                encoder: this.customEncoder,
            });
        }

        return request;
    }

    public sendRequest(request: HttpRequest): any {

        // DEBUG ONLY
        if (request?.debug) {
            this.loggerService.info(request);
        }

        // Break if not defined http method
        if (_.isUndefined(request.method)) {
            return; // break
        }

        // Add a timestamp, useful to know
        // when the request started
        request = {
            ...request,
            timestamp: new Date().getTime(),
        };

        const url: string = request.url;
        const body = request.body;
        const options: any = {
            headers: request.headers,
            params: request.params,
            withCredentials: false,
            reportProgress: false,
            observe: 'response',
            ...request.options,
        };

        // Pending Request
        let pending: Observable<any>;

        switch (request.method) {

            // GET
            case HttpRequestMethod.Get:
                pending = this.http.get<any>(url, options);
                break;

            // POST
            case HttpRequestMethod.Post:
                pending = this.http.post<any>(url, body, options);
                break;

            // PUT
            case HttpRequestMethod.Put:
                pending = this.http.put<any>(url, body, options);
                break;

            // PATCH
            case HttpRequestMethod.Patch:
                pending = this.http.patch<any>(url, body, options);
                break;

            // DELETE
            case HttpRequestMethod.Delete:
                pending = this.http.delete<any>(url, options);
                break;

            default:
                break;
        }

        // Process Request
        pending?.subscribe(
            (response: any) => this.handleSuccess(request, response),
            (error: any) => this.handleError(request, error),
        );
    }

    //****************************************************************************************
    // LIFECYCLES
    //****************************************************************************************

    public ngOnInit() {
        this.checkObservables();
    }

    public ngOnDestroy() {
        this.destroyObservables();
    }

}
