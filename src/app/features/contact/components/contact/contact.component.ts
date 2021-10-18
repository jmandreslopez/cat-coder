import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

// App
import { isValidForm } from '@app/helpers';
import { Form } from '@app/models';

// Feature
import { ContactService } from '../../services';

@Component({
    selector: 'tcc-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
    private subscriptions: Array<Subscription> = [];
    public contactForm: FormGroup;
    public loading: boolean = false;

    constructor(private contactService: ContactService,
                private formBuilder: FormBuilder) {

        this.bindObservables();
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

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
    // EVENTS
    //****************************************************************************************

    //

    //****************************************************************************************
    // HANDLERS
    //****************************************************************************************

    private handleSuccess(response: any) {

        if (_.isUndefined(response)) {
            return; // break
        }

        // Reset form
        this.contactForm.reset();
    }

    private handleError(error: any) {
        //
    }

    private handleAlways() {
        this.loading = false;
    }

    //****************************************************************************************
    // FORMS
    //****************************************************************************************

    public initForm() {
        this.contactForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            subject: new FormControl('', [Validators.required]),
            message: new FormControl('', [Validators.required]),
        });
    }

    public submitForm({ value, valid }: Form) {

        // Invalid form
        if (! isValidForm(this.contactForm)) {
            return; // break
        }

        this.loading = true;
        this.contactService.contact(value, {
            success: (response: any) => this.handleSuccess(response),
            error: (error: any) => this.handleError(error),
            always: () => this.handleAlways(),
        });
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    //

    //****************************************************************************************
    // LIFECYCLES
    //****************************************************************************************

    public ngOnInit() {
        this.checkObservables();

        // Init Form
        this.initForm();
    }

    public ngOnDestroy() {
        this.destroyObservables();
    }

}
