import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EditSubCategoryRoutingModule } from "./edit-sub-category-routing.module";
import { EditSubCategoryComponent } from "./edit-sub-category.component";

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EditSubCategoryRoutingModule,
        CoreModule
    ],
    declarations: [
        EditSubCategoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EditSubCategoryModule { }
