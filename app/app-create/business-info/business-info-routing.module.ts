import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BusinessInfoComponent } from "./business-info.component";

const routes: Routes = [
    { path: "", component: BusinessInfoComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BusinessInfoRoutingModule { }
