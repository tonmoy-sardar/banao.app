import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AddSubCategoryRoutingModule } from "./add-sub-category-routing.module";
import { AddSubCategoryComponent } from "./add-sub-category.component";

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddSubCategoryRoutingModule,
        CoreModule
    ],
    declarations: [
        AddSubCategoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddSubCategoryModule { }
