import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AboutUsRoutingModule } from "./about-us-routing.module";
import { AboutUsComponent } from "./about-us.component";

import { CoreModule } from "../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AboutUsRoutingModule,
        CoreModule
    ],
    declarations: [
        AboutUsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AboutUsModule { }
