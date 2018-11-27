import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EditSocialMediaRoutingModule } from './edit-social-media-routing.module';
import { EditSocialMediaComponent } from './edit-social-media.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EditSocialMediaRoutingModule,
        CoreModule
    ],
    declarations: [
        EditSocialMediaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EditSocialMediaModule { }
