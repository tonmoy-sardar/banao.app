import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TermsConditionsComponent } from "./terms-conditions.component";

const routes: Routes = [
    { path: "", component: TermsConditionsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TermsConditionsRoutingModule { }
