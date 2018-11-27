import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SubscriptionDetailsRoutingModule } from './subscription-details-routing.module';
import { SubscriptionDetailsComponent } from './subscription-details.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SubscriptionDetailsRoutingModule,
        CoreModule
    ],
    declarations: [
        SubscriptionDetailsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SubscriptionDetailsModule { }
