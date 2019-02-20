import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
    { path: "", redirectTo: "/franchise-user", pathMatch: "full" },
    { path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardModule", canLoad: [AuthGuard] },
    { path: "franchise-user", loadChildren: "./franchise-user/franchise-user.module#FranchiseUserModule", canLoad: [AuthGuard] },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "signup", loadChildren: "./signup/signup.module#SignupModule" },
    { path: "forgot-password", loadChildren: "./forgot-password/forgot-password.module#ForgotPasswordModule" },
    { path: 'created-app', loadChildren: './created-app/created-app.module#CreatedAppModule' },
    { path: 'app-create', loadChildren: './app-create/app-create.module#AppCreateModule' },
    { path: "about-us", loadChildren: "./about-us/about-us.module#AboutUsModule" },
    { path: "contact-us", loadChildren: "./contact-us/contact-us.module#ContactUsModule" },
    { path: "terms-conditions", loadChildren: "./terms-conditions/terms-conditions.module#TermsConditionsModule" },
    { path: "privacy-policy", loadChildren: "./privacy-policy/privacy-policy.module#PrivacyPolicyModule" },
    { path: "refund-cancellation", loadChildren: "./refund-cancellation/refund-cancellation.module#RefundCancellationModule" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
