import { NgModule } from '@angular/core';

// Modules
import { ContactModule } from '@app/features/contact/contact.module';
import { SharedModule } from '@app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

// Components
import { HomeComponent } from './components';

@NgModule({
    imports: [
        ContactModule,
        SharedModule,

        // Routing
        HomeRoutingModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: []
})
export class HomeModule {
    //
}
