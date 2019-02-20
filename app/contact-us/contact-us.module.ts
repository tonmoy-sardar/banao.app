import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ContactUsRoutingModule } from "./contact-us-routing.module";
import { ContactUsComponent } from "./contact-us.component";

import { CoreModule } from "../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ContactUsRoutingModule,
        CoreModule
    ],
    declarations: [
        ContactUsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ContactUsModule { }
