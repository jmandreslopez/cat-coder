import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { Subscription, Subject } from 'rxjs';

// App
import { ConfigService } from '@app/config';

const DEFAULT_CONFIG: any = {
    size: 'lg',
};

@Component({
    selector: 'tcc-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() title: string;
    @Input() config: any = {};
    @Input() trigger: Subject<boolean>;
    @Output() shown: EventEmitter<void> = new EventEmitter<void>();
    @Output() hidden: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild(ModalDirective) modal: ModalDirective;
    @ContentChild('footer') footerTemplate: TemplateRef<any>;
    private subscriptions: Array<Subscription> = [];

    constructor(private configService: ConfigService) {
        //
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    private bindObservables() {
        if (!_.isUndefined(this.trigger)) {
            this.subscriptions = [
                ...this.subscriptions,
                this.trigger.subscribe((trigger: boolean) => this.onTrigger(trigger)),
            ];
        }
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

    public onTrigger(trigger: boolean) {
        trigger ? this.show() : this.hide();
    }

    public onShown() {

        // Emit Event
        this.shown.emit();
    }

    public onHidden() {

        // Emit Event
        this.hidden.emit();
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    public show() {
        this.modal.show();
    }

    public hide() {
        this.modal.hide();
    }

    private initConfig() {
        this.config = _.defaultsDeep(this.config, DEFAULT_CONFIG,
            { size: this.configService.getInterfaceModalsSize() },
        );
    }

    //****************************************************************************************
    // LIFECYCLES
    //****************************************************************************************

    public ngOnInit() {

        // Bind observables on the OnInit lifecycle
        // to allow that the Input gets received
        this.bindObservables();

        this.checkObservables();

        // Init Config
        this.initConfig();
    }

    public ngOnDestroy() {
        this.destroyObservables();
    }

}
