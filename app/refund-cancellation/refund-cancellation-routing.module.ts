import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { RefundCancellationComponent } from "./refund-cancellation.component";

const routes: Routes = [
    { path: "", component: RefundCancellationComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class RefundCancellationRoutingModule { }
