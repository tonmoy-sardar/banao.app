import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "refund-cancellation",
    moduleId: module.id,
    templateUrl: "./refund-cancellation.component.html"
})
export class RefundCancellationComponent implements OnInit {

    constructor(
        private routerExtensions: RouterExtensions
    ) {

    }

    ngOnInit(): void {

    }



    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onNavBtnTap() {
        // This code will be called only in Android.
        this.routerExtensions.back();
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
