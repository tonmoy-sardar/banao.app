import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { FranchiseUserService } from "../core/services/franchise-user.service"
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { LoadingIndicator } from "nativescript-loading-indicator"

@Component({
    selector: "franchise-user",
    moduleId: module.id,
    templateUrl: "./franchise-user.component.html"
})
export class FranchiseUserComponent implements OnInit {
    FranchiseUserList: any = [];
    user_id: string;
    loader = new LoadingIndicator();
    lodaing_options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
            indeterminate: true,
            cancelable: false,
            cancelListener: function (dialog) { console.log("Loading cancelled") },
            max: 100,
            progressNumberFormat: "%1d/%2d",
            progressPercentFormat: 0.53,
            progressStyle: 1,
            secondaryProgress: 1
        },
        ios: {
            details: "Additional detail note!",
            margin: 10,
            dimBackground: true,
            color: "#4B9ED6",
            backgroundColor: "yellow",
            userInteractionEnabled: false,
            hideBezel: true,
        }
    }
    constructor(
        private franchiseUserService: FranchiseUserService,
        private router: RouterExtensions,
    ) {
        // Use the component constructor to inject providers.
    }


    ngOnInit(): void {
        this.loader.show(this.lodaing_options);
        this.user_id = getString('user_id');
        this.getFranchiseUserList();
    }

    getFranchiseUserList() {
        this.franchiseUserService.getFranchiseUserList(this.user_id).subscribe(
            (res: any[]) => {
                this.FranchiseUserList = res;
                console.log(res)
                this.loader.hide();
            },
            error => {
                console.log(error)
                this.loader.hide();
            }
        )
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onNavItemTap(navItemRoute: string): void {

        console.log(navItemRoute);
        this.router.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
