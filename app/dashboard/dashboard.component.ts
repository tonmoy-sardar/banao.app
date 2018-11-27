import { Component, OnInit } from '@angular/core';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { LoadingIndicator } from "nativescript-loading-indicator"
import { RouterExtensions } from "nativescript-angular/router";
import { ExploreService } from "../core/services/explore.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import * as Globals from '../core/globals';
import { NotificationService } from "../core/services/notification.service";
const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "dashboard",
    moduleId: module.id,
    templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
    user_id: string;
    user_app_list: any = [];
    base_url: string = Globals.img_base_url;
    processing = false;

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
    device_token: string;
    badgeCountStatus: boolean;
    constructor(
        private router: RouterExtensions,
        private exploreService: ExploreService,
        private notificationService: NotificationService
    ) {
        firebase.getCurrentPushToken().then((token: string) => {
            // may be null if not known yet
            if (token != null) {
                setString('device_token', token)
            }
            console.log(`Current push token: ${token}`);
        });
        notificationService.getBadgeCountStatus.subscribe(status => this.changebadgeCountStatus(status))
    }

    ngOnInit() {
        this.loader.show(this.lodaing_options);
        this.user_id = getString('user_id');
        this.device_token = getString('device_token');
        console.log(this.device_token);
        console.log(this.user_id);
        this.getDashboardAppList();
        this.updateDeviceToken();
    }

    private changebadgeCountStatus(status: boolean): void {
        this.badgeCountStatus = status;
        console.log(this.badgeCountStatus)
        if (this.badgeCountStatus == true) {
            this.getDashboardAppList();
        }
    }

    updateDeviceToken() {
        var data = {
            user: this.user_id,
            device_token: this.device_token
        }
        this.notificationService.updateDeviceToken(this.user_id, data).subscribe(
            res => {
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }

    getDashboardAppList() {

        this.exploreService.getAppAndUserDetailsByUserID(this.user_id).subscribe(
            res => {
                // this.processing = false;
                //console.log(res);
                this.user_app_list = [];
                res['user_details'][0].app_details.forEach(x => {
                    var chatUnReadCount = 0;
                    var orderUnreadCount = 0;
                    x.chat_details.forEach(y => {
                        chatUnReadCount += y.unread_messages
                    })
                    x.order_details.forEach(z => {
                        orderUnreadCount += z.order_unseen
                    })
                    x['total_unread_notification'] = chatUnReadCount + orderUnreadCount;
                    this.user_app_list.push(x)
                })
                // this.user_app_list = res['user_details'][0].app_details;
                console.log(this.user_app_list);
                this.loader.hide();
            },
            error => {
                // this.processing = false;
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