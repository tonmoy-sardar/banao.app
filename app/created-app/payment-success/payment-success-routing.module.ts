import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PaymentSuccessComponent } from "./payment-success.component";

const routes: Routes = [
    { path: "", component: PaymentSuccessComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PaymentSuccessRoutingModule { }
