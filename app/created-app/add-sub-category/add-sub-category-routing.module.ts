import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AddSubCategoryComponent } from "./add-sub-category.component";

const routes: Routes = [
    { path: "", component: AddSubCategoryComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AddSubCategoryRoutingModule { }
