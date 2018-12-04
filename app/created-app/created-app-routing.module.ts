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
            { path: "products", loadChildren: "./products/products.module#ProductsModule" },
            { path: "products/:key", loadChildren: "./products/products.module#ProductsModule" },
            { path: "add-category", loadChildren: "./add-category/add-category.module#AddCategoryModule" },
            { path: "add-category/:key", loadChildren: "./add-category/add-category.module#AddCategoryModule" },
            { path: "edit-category/:id", loadChildren: "./edit-category/edit-category.module#EditCategoryModule" },
            { path: "edit-category/:id/:key", loadChildren: "./edit-category/edit-category.module#EditCategoryModule" },
            { path: "add-sub-category/:id", loadChildren: "./add-sub-category/add-sub-category.module#AddSubCategoryModule" },
            { path: "add-sub-category/:id/:key", loadChildren: "./add-sub-category/add-sub-category.module#AddSubCategoryModule" },
            { path: "edit-sub-category/:id", loadChildren: "./edit-sub-category/edit-sub-category.module#EditSubCategoryModule" },
            { path: "edit-sub-category/:id/:key", loadChildren: "./edit-sub-category/edit-sub-category.module#EditSubCategoryModule" },
            { path: "add-product", loadChildren: "./add-product/add-product.module#AddProductModule" },
            { path: "add-product/:key", loadChildren: "./add-product/add-product.module#AddProductModule" },
            { path: "edit-product/:id", loadChildren: "./edit-product/edit-product.module#EditProductModule" },
            { path: "edit-product/:id/:key", loadChildren: "./edit-product/edit-product.module#EditProductModule" },
            { path: "add-service", loadChildren: "./add-service/add-service.module#AddServiceModule" },
            { path: "add-service/:key", loadChildren: "./add-service/add-service.module#AddServiceModule" },
            { path: "edit-service/:id", loadChildren: "./edit-service/edit-service.module#EditServiceModule" },
            { path: "edit-service/:id/:key", loadChildren: "./edit-service/edit-service.module#EditServiceModule" },
        ]
    }

];


@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CreatedAppRoutingModule { }
