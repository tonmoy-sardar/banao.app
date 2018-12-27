import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { FranchiseUserRoutingModule } from "./franchise-user-routing.module";
import { FranchiseUserComponent } from "./franchise-user.component";

import { CoreModule } from "../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FranchiseUserRoutingModule,
        CoreModule
    ],
    declarations: [
        FranchiseUserComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FranchiseUserModule { }
