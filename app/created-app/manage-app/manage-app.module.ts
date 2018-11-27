import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ManageAppRoutingModule } from './manage-app-routing.module';
import { ManageAppComponent } from './manage-app.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ManageAppRoutingModule,
        CoreModule
    ],
    declarations: [
        ManageAppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ManageAppModule { }
