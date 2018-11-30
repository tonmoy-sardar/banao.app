import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PaymentSuccessRoutingModule } from './payment-success-routing.module';
import { PaymentSuccessComponent } from './payment-success.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PaymentSuccessRoutingModule,
        CoreModule
    ],
    declarations: [
        PaymentSuccessComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PaymentSuccessModule { }
