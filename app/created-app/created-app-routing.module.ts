import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CreatedAppComponent } from "./created-app.component";

const routes: Routes = [
    {
        path: ':id',
        component: CreatedAppComponent,
        children: [
            { path: "details", loadChildren: "./details-app/details-app.module#DetailsAppModule" },
            { path: "manage-app", loadChildren: "./manage-app/manage-app.module#ManageAppModule" },
            { path: "edit-app", loadChildren: "./edit-app/edit-app.module#EditAppModule" },
            { path: "edit-owner-info", loadChildren: "./edit-owner-info/edit-owner-info.module#EditOwnerInfoModule" },
            { path: "edit-social-media", loadChildren: "./edit-social-media/edit-social-media.module#EditSocialMediaModule" },
            { path: "subscription-details", loadChildren: "./subscription-details/subscription-details.module#SubscriptionDetailsModule" },
            { path: "customers", loadChildren: "./customers/customers.module#CustomersModule" },
            { path: "messages", loadChildren: "./messages/messages.module#MessagesModule" },
            { path: "chat/:user", loadChildren: "./chat/chat.module#ChatModule" },
            { path: "order-history", loadChildren: "./order-history/order-history.module#OrderHistoryModule" },
            { path: "edit-business-images", loadChildren: "./edit-business-images/edit-business-images.module#EditBusinessImagesModule" },
            { path: "edit-business-images/:key", loadChildren: "./edit-business-images/edit-business-images.module#EditBusinessImagesModule" },
            { path: "payment", loadChildren: "./payment/payment.module#PaymentModule" },
            { path: "payment-success", loadChildren: "./payment-success/payment-success.module#PaymentSuccessModule" },

        ]
    }

];


@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CreatedAppRoutingModule { }
