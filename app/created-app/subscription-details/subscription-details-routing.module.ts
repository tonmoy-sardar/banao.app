import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SubscriptionDetailsComponent } from "./subscription-details.component";

const routes: Routes = [
    { path: "", component: SubscriptionDetailsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SubscriptionDetailsRoutingModule { }
