import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { DetailsAppRoutingModule } from './details-app-routing.module';
import { DetailsAppComponent } from './details-app.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        DetailsAppRoutingModule,
        CoreModule
    ],
    declarations: [
        DetailsAppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DetailsAppModule { }
