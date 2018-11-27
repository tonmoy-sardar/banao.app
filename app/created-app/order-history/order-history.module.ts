import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { OrderHistoryRoutingModule } from "./order-history-routing.module";
import { OrderHistoryComponent } from "./order-history.component";

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        OrderHistoryRoutingModule,
        CoreModule
    ],
    declarations: [
        OrderHistoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OrderHistoryModule { }
