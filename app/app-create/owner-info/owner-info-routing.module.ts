import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { OwnerInfoComponent } from "./owner-info.component";

const routes: Routes = [
    { path: "", component: OwnerInfoComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OwnerInfoRoutingModule { }
