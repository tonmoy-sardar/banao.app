import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { EditBusinessImagesComponent } from "./edit-business-images.component";

const routes: Routes = [
    { path: "", component: EditBusinessImagesComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EditBusinessImagesRoutingModule { }
