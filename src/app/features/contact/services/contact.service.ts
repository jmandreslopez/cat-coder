import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

// App
import { Callbacks } from '@app/models';
import { ContactRestService } from './contact-rest.service';

@Injectable({
    providedIn: 'root'
})
export class ContactService implements OnInit, OnDestroy {
    private subscriptions: Array<Subscription> = [];

    constructor(private contactRestService: ContactRestService) {

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
        //
    }

    private checkObservables() {
        //
    }

    private destroyObservables() {
        this.subscriptions.forEach((subscription: Subscription) => subscription?.unsubscribe());
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    public contact(formData: any, callbacks: Callbacks = {}) {

        if (_.isUndefined(formData)) {
            return; // break
        }

        this.contactRestService.contact(formData, {
            success: (response: any) => callbacks?.success?.(response),
            error: (error: any) => callbacks?.error?.(error),
            always: () => callbacks?.always?.(),
        });
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
