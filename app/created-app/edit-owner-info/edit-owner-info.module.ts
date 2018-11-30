import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EditOwnerInfoRoutingModule } from './edit-owner-info-routing.module';
import { EditOwnerInfoComponent } from './edit-owner-info.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EditOwnerInfoRoutingModule,
        CoreModule
    ],
    declarations: [
        EditOwnerInfoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EditOwnerInfoModule { }
