import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { EditSubCategoryComponent } from "./edit-sub-category.component";

const routes: Routes = [
    { path: "", component: EditSubCategoryComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EditSubCategoryRoutingModule { }
