import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EditProductRoutingModule } from "./edit-product-routing.module";
import { EditProductComponent } from "./edit-product.component";

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EditProductRoutingModule,
        CoreModule
    ],
    declarations: [
        EditProductComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EditProductModule { }
