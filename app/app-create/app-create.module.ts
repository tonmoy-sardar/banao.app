import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AppCreateRoutingModule } from './app-create-routing.module';
import { AppCreateComponent } from './app-create.component';


import { CoreModule } from "../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AppCreateRoutingModule,
        CoreModule
    ],
    declarations: [
        AppCreateComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppCreateModule { }
