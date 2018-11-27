import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MessagesRoutingModule,
        CoreModule
    ],
    declarations: [
        MessagesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class  MessagesModule { }
