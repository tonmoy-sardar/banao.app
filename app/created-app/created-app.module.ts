import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CreatedAppRoutingModule } from './created-app-routing.module';
import { CreatedAppComponent } from './created-app.component';



import { CoreModule } from "../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CreatedAppRoutingModule,
        CoreModule
    ],
    declarations: [
        CreatedAppComponent,
      ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CreatedAppModule { }
