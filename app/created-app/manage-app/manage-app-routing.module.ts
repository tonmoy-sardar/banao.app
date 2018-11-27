import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ManageAppComponent } from "./manage-app.component";

const routes: Routes = [
    { path: "", component: ManageAppComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ManageAppRoutingModule { }
