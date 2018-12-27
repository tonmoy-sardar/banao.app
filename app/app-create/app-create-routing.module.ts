import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppCreateComponent } from "./app-create.component";


const routes: Routes = [
    {
        path: '',
        component: AppCreateComponent,
        children: [
            { path: "category-choose", loadChildren: "./category-choose/category-choose.module#CategoryChooseModule" },
            { path: "business-info", loadChildren: "./business-info/business-info.module#BusinessInfoModule" },
            { path: "owner-info", loadChildren: "./owner-info/owner-info.module#OwnerInfoModule" },
            { path: "franchise-info", loadChildren: "./franchise-info/franchise-info.module#FranchiseInfoModule" },

        ]
    }

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppCreateRoutingModule { }
