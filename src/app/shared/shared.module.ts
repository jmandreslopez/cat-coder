import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import * as _ from 'lodash';

// Vendors
import { BreadcrumbsModule } from '@exalif/ngx-breadcrumbs';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { LaddaModule } from 'angular2-ladda';
import { MomentModule } from 'ngx-moment';
import { NgPipesModule } from 'ngx-pipes';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

// Options
import { LaddaOptions, ToastrOptions } from '@app/options';

// Pipes
import { ExcludesPipe, IncludesPipe, PlaceholderPipe, SafePipe, TimesPipe } from '@app/pipes';

// Components
import { NavigationComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,

        // Vendors
        BreadcrumbsModule.forRoot(), // @exalif/ngx-breadcrumbs
        NgxErrorsModule, // @hackages/ngxerrors
        LaddaModule.forRoot(LaddaOptions), // angular2-ladda
        MomentModule, // ngx-moment
        NgPipesModule, // ngx-pipes
        ToastrModule.forRoot(ToastrOptions), // ngx-toastr
        // ToastContainerModule, // ngx-toastr
    ],
    declarations: [

        // Components
        NavigationComponent,

        // Pipes
        ExcludesPipe,
        IncludesPipe,
        PlaceholderPipe,
        SafePipe,
        TimesPipe,
    ],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,

        // Modules
        BreadcrumbsModule, // @exalif/ngx-breadcrumbs
        NgxErrorsModule, // @hackages/ngxerrors
        LaddaModule, // angular2-ladda
        MomentModule, // ngx-moment
        NgPipesModule, // ngx-pipes
        ToastrModule, // ngx-toastr
        // ToastContainerModule, // ngx-toastr

        // Components
        NavigationComponent,

        // Pipes
        ExcludesPipe,
        IncludesPipe,
        PlaceholderPipe,
        SafePipe,
        TimesPipe,
    ],
    providers: []
})
export class SharedModule {
    //
}
