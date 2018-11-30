import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EditBusinessImagesRoutingModule } from './edit-business-images-routing.module';
import { EditBusinessImagesComponent } from './edit-business-images.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EditBusinessImagesRoutingModule,
        CoreModule
    ],
    declarations: [
        EditBusinessImagesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EditBusinessImagesModule { }
