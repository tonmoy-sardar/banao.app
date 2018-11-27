import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CategoryChooseRoutingModule } from './category-choose-routing.module';
import { CategoryChooseComponent } from './category-choose.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CategoryChooseRoutingModule,
        CoreModule
    ],
    declarations: [
        CategoryChooseComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CategoryChooseModule { }
