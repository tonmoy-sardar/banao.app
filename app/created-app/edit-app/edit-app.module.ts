import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EditAppRoutingModule } from './edit-app-routing.module';
import { EditAppComponent } from './edit-app.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EditAppRoutingModule,
        CoreModule
    ],
    declarations: [
        EditAppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EditAppModule { }
