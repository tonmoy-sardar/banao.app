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
            // { path: "manage-app", loadChildren: "./manage-app/manage-app.module#ManageAppModule" },
            // { path: "edit-app", loadChildren: "./edit-app/edit-app.module#EditAppModule" },
            // { path: "edit-social-media", loadChildren: "./edit-social-media/edit-social-media.module#EditSocialMediaModule" },
            // { path: "subscription-details", loadChildren: "./subscription-details/subscription-details.module#SubscriptionDetailsModule" },
            // { path: "customers", loadChildren: "./customers/customers.module#CustomersModule" },
            // { path: "messages", loadChildren: "./messages/messages.module#MessagesModule" },
            // { path: "chat/:user", loadChildren: "./chat/chat.module#ChatModule" },


        ]
    }

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppCreateRoutingModule { }
