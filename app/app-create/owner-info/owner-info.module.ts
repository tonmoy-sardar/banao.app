import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { OwnerInfoRoutingModule } from './owner-info-routing.module';
import { OwnerInfoComponent } from './owner-info.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        OwnerInfoRoutingModule,
        CoreModule
    ],
    declarations: [
        OwnerInfoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OwnerInfoModule { }
