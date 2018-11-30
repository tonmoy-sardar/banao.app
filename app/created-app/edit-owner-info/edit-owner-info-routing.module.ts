import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { EditOwnerInfoComponent } from "./edit-owner-info.component";

const routes: Routes = [
    { path: "", component: EditOwnerInfoComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EditOwnerInfoRoutingModule { }
