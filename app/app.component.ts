import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
var orientation = require('nativescript-orientation');
import * as application from "tns-core-modules/application";
import { NavigationEnd, Router } from "@angular/router";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";

import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";

import { LoginService } from "../app/core/services/login.service";
var Globals = require("../app/core/globals");
import * as Connectivity from "tns-core-modules/connectivity";
import { Color } from "tns-core-modules/color";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import {
    CFAlertDialog,
    DialogOptions,
    CFAlertGravity,
    CFAlertActionAlignment,
    CFAlertActionStyle,
    CFAlertStyle,
} from 'nativescript-cfalert-dialog';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    public connectionType: string;
    private feedback: Feedback;
    is_success: boolean;

    isLoggedin: boolean;
    logged_user_id: string;
    logged_user_first_name: string;
    logged_user_last_name: string;
    logged_user_email: string;
    logged_user_contact_no: string;
    logged_user_profile_image: string;
    img_base_url;
    private cfalertDialog: CFAlertDialog;
    logged_user_group: string;
    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private loginService: LoginService,
        private zone: NgZone,
    ) {
        // Use the component constructor to inject services.
        orientation.setOrientation("portrait");
        application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
            if (this.routerExtensions.canGoBack()) {
                args.cancel = true;
                // this.router.back();
            } else {
                args.cancel = false;
            }
        });
        loginService.getLoginStatus.subscribe(status => this.changeLoginStatus(status))
        this.cfalertDialog = new CFAlertDialog();
    }


    private changeLoginStatus(status: boolean): void {
        if (status) {
            this.loadUserData();
        }
        else {
            this.loadUserData();
        }
    }

    ngOnInit(): void {



        this._activatedUrl = "/dashboard/" + this.logged_user_id;
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
        this.loadUserData();
        this.img_base_url = Globals.img_base_url;

        this.connectionType = this.connectionToString(Connectivity.getConnectionType());
        Connectivity.startMonitoring(connectionType => {
            this.zone.run(() => {
                this.connectionType = this.connectionToString(connectionType);
                if (this.connectionType == "0" && !this.is_success) {
                    this.is_success = true;

                    this.errorNotification('No Connection!');

                }
                else if (this.connectionType == "1" && this.is_success) {
                    this.is_success = false;
                    this.successNotification('Network Connected');

                }

            });
        });
    }

    successNotification = function (msg) {
        let options: DialogOptions = {
            dialogStyle: CFAlertStyle.NOTIFICATION,
            title: '',
            message: msg,
            backgroundBlur: true,
            cancellable: true,
            messageColor: '#008000',
        };
        this.cfalertDialog.show(options);
        setTimeout(() => this.cfalertDialog.dismiss(true), 2000);
    };

    errorNotification = function (msg) {
        let options: DialogOptions = {
            dialogStyle: CFAlertStyle.NOTIFICATION,
            title: '',
            message: msg,
            backgroundBlur: true,
            cancellable: true,
            messageColor: '#DC1431',
        };
        this.cfalertDialog.show(options);
        setTimeout(() => this.cfalertDialog.dismiss(true), 2000);
    };

    connectionToString(connectionType: number): string {
        switch (connectionType) {
            case Connectivity.connectionType.none:
                return "0";
            case Connectivity.connectionType.wifi:
                return "1";
            case Connectivity.connectionType.mobile:
                return "1";
            default:
                return "0";
        }
    }

    loadUserData() {
        this.isLoggedin = getBoolean('isLoggedin');
        this.logged_user_id = getString('user_id');
        this.logged_user_first_name = getString('first_name');
        this.logged_user_last_name = getString('last_name');
        this.logged_user_email = getString('email');
        this.logged_user_contact_no = getString('contact_no');
        this.logged_user_group = getString('logged_user_group');
        console.log(this.logged_user_group)
        console.log("logged_user_id:" + this.logged_user_id)
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
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

    logout() {

        clear();
        this.loginService.loginStatus(false)

        var navItemRoute = '/login'
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
