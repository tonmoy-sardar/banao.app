import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";
import { ForgotPasswordComponent } from "./forgot-password.component";

import { CoreModule } from "../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ForgotPasswordRoutingModule,
        CoreModule
    ],
    declarations: [
        ForgotPasswordComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ForgotPasswordModule { }
