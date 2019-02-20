import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TermsConditionsRoutingModule } from "./terms-conditions-routing.module";
import { TermsConditionsComponent } from "./terms-conditions.component";

import { CoreModule } from "../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TermsConditionsRoutingModule,
        CoreModule
    ],
    declarations: [
        TermsConditionsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TermsConditionsModule { }
