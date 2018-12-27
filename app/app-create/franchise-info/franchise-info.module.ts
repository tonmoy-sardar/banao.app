import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { FranchiseInfoRoutingModule } from './franchise-info-routing.module';
import { FranchiseInfoComponent } from './franchise-info.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FranchiseInfoRoutingModule,
        CoreModule
    ],
    declarations: [
        FranchiseInfoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FranchiseInfoModule { }
