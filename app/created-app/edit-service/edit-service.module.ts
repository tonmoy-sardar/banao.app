import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EditServiceRoutingModule } from "./edit-service-routing.module";
import { EditServiceComponent } from "./edit-service.component";

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EditServiceRoutingModule,
        CoreModule
    ],
    declarations: [
        EditServiceComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EditServiceModule { }
