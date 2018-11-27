import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CategoryChooseComponent } from "./category-choose.component";

const routes: Routes = [
    { path: "", component: CategoryChooseComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CategoryChooseRoutingModule { }
