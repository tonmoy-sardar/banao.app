import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AddProductRoutingModule } from "./add-product-routing.module";
import { AddProductComponent } from "./add-product.component";

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddProductRoutingModule,
        CoreModule
    ],
    declarations: [
        AddProductComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddProductModule { }
