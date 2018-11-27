import { Component, OnInit, Input } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { ListViewEventData, RadListView, LoadOnDemandListViewEventData } from "nativescript-ui-listview";
import * as Globals from '../../core/globals';
import { CreatedAppService } from "../../core/services/created-app.service";
import { NotificationService } from "../../core/services/notification.service";
import { ExploreService } from "../../core/services/explore.service";

@Component({
    selector: "order-history",
    moduleId: module.id,
    templateUrl: "./order-history.component.html"
})
export class OrderHistoryComponent implements OnInit {
    app_id: string;
    order_list: any = [];
    lodaing_options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
            indeterminate: true,
            cancelable: true,
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
    visible_key: boolean;
    page: number = 1;
    next_page: string;
    total_item: number;
    loader = new LoadingIndicator();
    @Input() opened = false;
    img_base_url: string;
    app_details: any;
    app_data: any = {
        logo: '',
        business_name: ''
    }
    badgeCountStatus: boolean;
    constructor(
        private routerExtensions: RouterExtensions,
        private createdAppService: CreatedAppService,
        private location: Location,
        private exploreService: ExploreService,
        private notificationService: NotificationService,
    ) {
        notificationService.getBadgeCountStatus.subscribe(status => this.changebadgeCountStatus(status))
        exploreService.homePageStatus(false);
    }

    ngOnInit(): void {
        this.loader.show(this.lodaing_options);
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.img_base_url = Globals.img_base_url;
        this.getOrderList();
        this.getAppDetails()
    }

    private changebadgeCountStatus(status: boolean): void {
        this.badgeCountStatus = status;
        if (this.badgeCountStatus == true) {
            this.order_list = [];
            this.getOrderList();
        }
    }

    getAppDetails() {
        this.createdAppService.getCreatedAppDetails(this.app_id).subscribe(
            res => {
                // console.log(res)
                this.app_details = res;
                this.app_data.logo = this.app_details.logo;
                this.app_data.business_name = this.app_details.business_name;
            },
            error => {
                // console.log(error)
            }
        )
    }

    onLoadMoreItemsRequested(args: LoadOnDemandListViewEventData) {
        const that = new WeakRef(this);
        const listView: RadListView = args.object;
        if (this.next_page != null) {
            setTimeout(function () {
                that.get().addMoreItemsFromSource();
                listView.notifyLoadOnDemandFinished();
            }, 1000);
            args.returnValue = true;
        } else {
            args.returnValue = false;
            listView.notifyLoadOnDemandFinished(true);
        }
    }

    itemToggle(item: any) {
        item.opened = !item.opened;
        if (!item.is_seen) {
            this.viewOrder(item.id)
        }
    }

    getOrderList() {
        let params = '';
        params = '?page=' + this.page;
        this.createdAppService.getAppOrderList(this.app_id, params).subscribe(
            (res) => {
                console.log(res)
                this.next_page = res['next'];
                this.total_item = res['count'];
                res['results'].forEach(x => {
                    this.order_list.push(x)
                })
                this.visible_key = true;
                this.loader.hide();
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }

    viewOrder(id) {
        this.createdAppService.customerOrderSeen(id).subscribe(
            res => {
            },
            error => {
                console.log(error)
            }
        )
    }

    getDiscount(price, discounted_price) {
        return Math.floor(((price - discounted_price) * 100) / price) + '%';
    }

    updateCustomerOrderPayment(order_id) {
        var data = {
            id: order_id,
        }
        this.loader.show(this.lodaing_options);
        this.createdAppService.updateCustomerOrderPayment(data).subscribe(
            res => {
                var index = this.order_list.findIndex(x => x.id == order_id)
                if (index != -1) {
                    this.order_list[index]['is_paid'] = true;
                }
                this.loader.hide();
                console.log(res)
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )

    }


    updateCustomerOrderDelivery(order_id) {
        var data = {
            id: order_id
        }
        this.loader.show(this.lodaing_options);
        this.createdAppService.updateCustomerOrderDelivery(data).subscribe(
            res => {                
                var index = this.order_list.findIndex(x => x.id == order_id)
                if (index != -1) {
                    this.order_list[index]['delivery_status'] = true;
                }
                this.loader.hide();
                console.log(res)
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )

    }

    addMoreItemsFromSource() {
        if (this.next_page != null) {
            var num_arr = this.next_page.split('=');
            var count = +num_arr[num_arr.length - 1]
            if (this.page == count - 1) {
                this.page = count;
                this.getOrderList();
            }
        }
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

        console.log(navItemRoute);
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
