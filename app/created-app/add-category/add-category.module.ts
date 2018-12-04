import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AddCategoryRoutingModule } from "./add-category-routing.module";
import { AddCategoryComponent } from "./add-category.component";

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddCategoryRoutingModule,
        CoreModule
    ],
    declarations: [
        AddCategoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddCategoryModule { }
