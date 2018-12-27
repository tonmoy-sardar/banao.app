import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { FranchiseUserComponent } from "./franchise-user.component";

const routes: Routes = [
    { path: "", component: FranchiseUserComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FranchiseUserRoutingModule { }
