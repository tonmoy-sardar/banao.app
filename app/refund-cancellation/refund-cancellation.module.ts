import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { RefundCancellationRoutingModule } from "./refund-cancellation-routing.module";
import { RefundCancellationComponent } from "./refund-cancellation.component";

import { CoreModule } from "../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        RefundCancellationRoutingModule,
        CoreModule
    ],
    declarations: [
        RefundCancellationComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RefundCancellationModule { }
