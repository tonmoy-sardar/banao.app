import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BusinessInfoRoutingModule } from './business-info-routing.module';
import { BusinessInfoComponent } from './business-info.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BusinessInfoRoutingModule,
        CoreModule
    ],
    declarations: [
        BusinessInfoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class  BusinessInfoModule { }
