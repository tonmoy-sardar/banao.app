import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PrivacyPolicyComponent } from "./privacy-policy.component";

const routes: Routes = [
    { path: "", component: PrivacyPolicyComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PrivacyPolicyRoutingModule { }
