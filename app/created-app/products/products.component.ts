import { Component, OnInit, Input } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import { Location } from '@angular/common';
import { CreatedAppService } from "../../core/services/created-app.service";
import { LoadingIndicator } from "nativescript-loading-indicator"
import { ExploreService } from "../../core/services/explore.service";
import { ListViewEventData, RadListView, LoadOnDemandListViewEventData } from "nativescript-ui-listview";
import * as Globals from '../../core/globals';

@Component({
    selector: "products",
    moduleId: module.id,
    templateUrl: "./products.component.html"
})
export class ProductsComponent implements OnInit {
    app_id: string;
    app_details: any;
    app_data = {
        logo: '',
        business_name: '',
        business_description: ''
    }

    category_list: any = [];
    serviceType;

    visible_key: boolean;
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
    key: string = '';
    page: number = 1;
    next_page: string;
    @Input() opened = false;
    img_base_url: string;
    constructor(
        private routerExtensions: RouterExtensions,
        private location: Location,
        private exploreService: ExploreService,
        private CreatedAppService: CreatedAppService,
    ) {
        exploreService.homePageStatus(false);
    }

    ngOnInit(): void {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        if (full_location.length > 4) {
            this.key = full_location[4].trim();
        }
        this.getAppDetails();
        this.img_base_url = Globals.img_base_url;
    }

    next() {
        this.onNavItemTap('/created-app/' + this.app_id + '/payment')
    }

    addCategory() {
        if (this.key != '') {
            this.onNavItemTap('/created-app/' + this.app_id + '/add-category/' + 'new')
        }
        else {
            this.onNavItemTap('/created-app/' + this.app_id + '/add-category')
        }

    }

    editCategory(id) {
        if (this.key != '') {
            this.onNavItemTap('/created-app/' + this.app_id + '/edit-category/' + id + '/new')
        }
        else {
            this.onNavItemTap('/created-app/' + this.app_id + '/edit-category/' + id)
        }
    }

    addSubCategory(id) {
        if (this.key != '') {
            this.onNavItemTap('/created-app/' + this.app_id + '/add-sub-category/' + id + '/new')
        }
        else {
            this.onNavItemTap('/created-app/' + this.app_id + '/add-sub-category/' + id)
        }

    }

    editSubCategory(id) {
        if (this.key != '') {
            this.onNavItemTap('/created-app/' + this.app_id + '/edit-sub-category/' + id + '/new')
        }
        else {
            this.onNavItemTap('/created-app/' + this.app_id + '/edit-sub-category/' + id)
        }
    }

    addProduct() {
        if (this.key != '') {
            this.onNavItemTap('/created-app/' + this.app_id + '/add-product/' + 'new')
        }
        else {
            this.onNavItemTap('/created-app/' + this.app_id + '/add-product')
        }
    }

    editProduct(id) {
        if (this.key != '') {
            this.onNavItemTap('/created-app/' + this.app_id + '/edit-product/' + id + '/new')
        }
        else {
            this.onNavItemTap('/created-app/' + this.app_id + '/edit-product/' + id)
        }
    }

    addService() {
        if (this.key != '') {
            this.onNavItemTap('/created-app/' + this.app_id + '/add-service/' + 'new')
        }
        else {
            this.onNavItemTap('/created-app/' + this.app_id + '/add-service')
        }
    }

    editService(id) {
        if (this.key != '') {
            this.onNavItemTap('/created-app/' + this.app_id + '/edit-service/' + id + '/new')
        }
        else {
            this.onNavItemTap('/created-app/' + this.app_id + '/edit-service/' + id)
        }
    }

    getAppDetails() {
        this.loader.show(this.lodaing_options);
        this.CreatedAppService.getAppCategoryProductList(this.app_id).subscribe(
            res => {
                // this.next_page = res['next'];
                // if (this.page == 1) {
                //     this.category_list = [];
                // }
                // this.app_details = res;
                // var data_list = [];
                // data_list = this.app_details.app_product_categories;


                // if (this.app_details.is_product_service) {
                //     this.serviceType = this.app_details.is_product_service;
                // }
                // else {
                //     this.serviceType = 1
                // }

                // for (var i = 0; i < data_list.length; i++) {
                    
                //     if (i == 0 && this.page == 1) {
                //         data_list[i]['opened'] = true;
                //     }
                //     else {
                //         data_list[i]['opened'] = false;
                //     }

                //     if (data_list[i]['products'][0].product_image != '') {
                //         data_list[i]['hasProductImage'] = true;
                //     }
                //     else {
                //         data_list[i]['hasProductImage'] = false;
                //     }

                //     var cat_index = this.category_list.findIndex(x => x.id == data_list[i].id)
                //     if (cat_index != -1) {
                //         data_list[i]['products'].forEach(z => {
                //             this.category_list[cat_index]['products'].push(z)
                //         })
                //     }
                //     else {
                //         this.category_list.push(data_list[i])
                //     }
                // }
                console.log(res)
                this.visible_key = true
                this.loader.hide();
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }

    addMoreItemsFromSource() {
        var num_arr = this.next_page.split('=');
        var count = +num_arr[num_arr.length - 1]
        if (this.page == count - 1) {
            this.page = count;
            this.getAppDetails();
        }
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

    deleteProductCategory(id) {
        // this.processing = true;
        let data = {
            is_active: false
        }
        this.loader.show(this.lodaing_options);
        this.CreatedAppService.deleteProductCategory(id, data).subscribe(
            res => {
                console.log("Success");
                this.loader.hide();
                this.onNavItemTap('/created-app/' + this.app_id + '/products')
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }

    deleteProduct(id) {
        // this.processing = true;
        let data = {
            is_active: false
        }
        this.loader.show(this.lodaing_options);
        this.CreatedAppService.deleteProduct(id, data).subscribe(
            res => {
                console.log("Success");
                this.loader.hide();
                this.onNavItemTap('/created-app/' + this.app_id + '/products')
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }

    getDiscount(price, discounted_price) {
        return Math.floor(((price - discounted_price) * 100) / price) + '%';
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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onNavBtnTap() {
        // This code will be called only in Android.
        this.routerExtensions.back();
    }
}
