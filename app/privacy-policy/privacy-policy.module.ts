import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PrivacyPolicyRoutingModule } from "./privacy-policy-routing.module";
import { PrivacyPolicyComponent } from "./privacy-policy.component";

import { CoreModule } from "../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PrivacyPolicyRoutingModule,
        CoreModule
    ],
    declarations: [
        PrivacyPolicyComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PrivacyPolicyModule { }
