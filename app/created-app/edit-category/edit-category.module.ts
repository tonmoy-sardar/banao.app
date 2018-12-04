import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EditCategoryRoutingModule } from "./edit-category-routing.module";
import { EditCategoryComponent } from "./edit-category.component";

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EditCategoryRoutingModule,
        CoreModule
    ],
    declarations: [
        EditCategoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EditCategoryModule { }
