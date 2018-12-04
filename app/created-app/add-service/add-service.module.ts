import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AddServiceRoutingModule } from "./add-service-routing.module";
import { AddServiceComponent } from "./add-service.component";

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddServiceRoutingModule,
        CoreModule
    ],
    declarations: [
        AddServiceComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddServiceModule { }
