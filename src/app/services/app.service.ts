import { Injectable, Inject, OnInit, OnDestroy, ElementRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationStart, Event } from '@angular/router';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Observer, Subscription } from 'rxjs';
import { filter, share } from 'rxjs/operators';

// App
import { ConfigService } from '@app/config';
import { App } from '@app/models';

@Injectable({
    providedIn: 'root'
})
export class AppService implements OnInit, OnDestroy {

    // Angular Universal: Browser check
    static isBrowser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private subscriptions: Array<Subscription> = [];
    private app: App;
    private app$: Observable<App>;
    private appObserver: Observer<App>;
    private elementRef: ElementRef;

    // States
    private loading: boolean = false;
    private error: boolean = false;

    constructor(@Inject(PLATFORM_ID) private platformId: any,
                private configService: ConfigService,
                private router: Router) {

        // Determine App type
        AppService.isBrowser.next(isPlatformBrowser(platformId));

        this.initObservables();
        this.bindObservables();

        // OnInit
        this.ngOnInit();
    }

    //****************************************************************************************
    // App: App
    //****************************************************************************************

    public getApp(): App {
        return this.app;
    }

    public setApp(app: App) {
        this.app = app;
        this.shareApp();
    }

    public hasApp(): boolean {
        return !_.isUndefined(this.getApp()) ? true : false;
    }

    private shareApp() {
        this.appObserver?.next?.(this.getApp());
    }

    public cleanApp() {
        this.app = undefined;
    }

    private destroyApp() {
        this.cleanApp();
        this.appObserver?.complete?.();
    }

    //****************************************************************************************
    // Loading: boolean
    //****************************************************************************************

    public getLoading(): boolean {
        return this.loading;
    }

    public setLoading(loading: boolean) {
        this.loading = loading;
    }

    public isLoading(): boolean {
        return this.getLoading() ? true : false;
    }

    //****************************************************************************************
    // Error: boolean
    //****************************************************************************************

    public getError(): boolean {
        return this.error;
    }

    public setError(error: boolean) {
        this.error = error;
    }

    public hasError(): boolean {
        return this.getError() ? true : false;
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    private initObservables() {
        this.app$ = new Observable<App>((observer: any) => this.appObserver = observer).pipe(share());
    }

    private bindObservables() {
        this.subscriptions = [
            this.getAppObservable().subscribe((app: App) => this.onApp(app)),
            this.router.events.pipe(filter((event: any) => event instanceof NavigationStart))
                .subscribe((navigationStartEvent: NavigationStart) => this.onNavigationStart(navigationStartEvent)),
        ];
    }

    private checkObservables() {
        //
    }

    private destroyObservables() {
        this.subscriptions.forEach((subscription: Subscription) => subscription?.unsubscribe());
    }

    public getAppObservable(): Observable<App> {
        return this.app$;
    }

    //****************************************************************************************
    // EVENTS
    //****************************************************************************************

    private onApp(app: App): any {

        if (_.isUndefined(app)) {
            return; // break
        }

        // Set App Version, this is a custom attribute
        this.elementRef?.nativeElement?.setAttribute?.('app-version', app.version);
    }

    private onNavigationStart(event: NavigationStart) {

        // Only if Debug is enabled
        if (! this.configService.isDebug()) {
            return; // break
        }

        // Check for URL flag
        if (event.url.toLowerCase().includes('loading=true')) {
            this.loading = true;
        }
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    public injectApp(app: App, elementRef?: ElementRef) {

        if (!_.isUndefined(elementRef)) {
            this.elementRef = elementRef;
        }

        this.setApp(app);
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
