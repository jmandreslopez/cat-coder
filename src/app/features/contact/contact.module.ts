import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '@app/shared/shared.module';

// Components
import { ContactComponent } from './components';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        ContactComponent,
    ],
    exports: [
        ContactComponent,
    ],
    providers: []
})
export class ContactModule {
    //
}
