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
import { Menu } from 'nativescript-menu';
import { Page } from 'tns-core-modules/ui/page/page';

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
    all_product_category: any = [];
    constructor(
        private routerExtensions: RouterExtensions,
        private location: Location,
        private exploreService: ExploreService,
        private CreatedAppService: CreatedAppService,
        public current_page: Page
    ) {
        exploreService.homePageStatus(false);
    }

    ngOnInit(): void {
        this.loader.show(this.lodaing_options);
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        if (full_location.length > 4) {
            this.key = full_location[4].trim();
        }
        this.getAppDetails();
        this.img_base_url = Globals.img_base_url;
        this.getAllProductCategoryList();
    }

    parentCatTap(view_id, category) {
        if (category.products == undefined) {
            Menu.popup({
                view: this.current_page.getViewById(view_id),
                actions: ["Add Sub Category", "Edit Category", "Delete Category"]
            })
                .then(value => {
                    if (value) {
                        var vString = value.toString()
                        if (vString == "Add Sub Category") {
                            this.addSubCategory(category.id)
                        }
                        else if (vString == "Edit Category") {
                            this.editCategory(category.id)
                        }
                        else if (vString == "Delete Category") {

                        }
                    }
                })
                .catch(console.log);
        }
        else {
            Menu.popup({
                view: this.current_page.getViewById(view_id),
                actions: ["Edit Category", "Delete Category"]
            })
                .then(value => {
                    if (value) {
                        var vString = value.toString()
                        if (vString == "Edit Category") {
                            this.editCategory(category.id)
                        }
                        else if (vString == "Delete Category") {

                        }
                    }
                })
                .catch(console.log);
        }

    }

    subCatTap(view_id, subCategory) {
        Menu.popup({
            view: this.current_page.getViewById(view_id),
            actions: ["Edit Sub Category", "Delete Sub Category"]
        })
            .then(value => {
                if (value) {
                    var vString = value.toString()
                    if (vString == "Edit Sub Category") {
                        this.editSubCategory(subCategory.id)
                    }
                    else if (vString == "Delete Sub Category") {

                    }
                }
            })
            .catch(console.log);
    }

    itemToggle(item: any) {
        item.opened = !item.opened;
    }

    getAllProductCategoryList() {
        this.CreatedAppService.getAllProductCategoryList(this.app_id).subscribe(
            (res: any[]) => {
                console.log(res)
                this.all_product_category = res;
                this.getAppProductList()
            },
            error => {
                console.log(error)
            }
        )
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
        this.CreatedAppService.getCreatedAppDetails(this.app_id).subscribe(
            res => {
                this.app_details = res;
                if (this.app_details.is_product_service) {
                    this.serviceType = this.app_details.is_product_service;
                }
                else {
                    this.serviceType = 1
                }
                this.app_data.logo = this.app_details.logo;
                this.app_data.business_name = this.app_details.business_name;
            },
            error => {
                // console.log(error)
            }
        )
    }

    getAppProductList() {
        this.CreatedAppService.getAppProductList(this.app_id).subscribe(
            res => {
                this.next_page = res['next'];
                if (this.page == 1) {
                    this.category_list = [];
                }

                var data_list = [];
                data_list = res['results'];

                for (var i = 0; i < data_list.length; i++) {

                    if (i == 0 && this.page == 1) {
                        data_list[i]['opened'] = true;
                    }
                    else {
                        data_list[i]['opened'] = false;
                    }

                    var cat_index = this.category_list.findIndex(x => x.id == data_list[i].id)
                    if (cat_index != -1) {
                        if (data_list[i]['sub_category'] != undefined) {
                            var Sub_cat_index = this.category_list[cat_index]['sub_category'].findIndex(y => y.id == data_list[i]['sub_category'].id)
                            if (Sub_cat_index != -1) {
                                data_list[i]['sub_category'][Sub_cat_index]['products'].forEach(z => {
                                    this.category_list[cat_index]['sub_category'][Sub_cat_index]['products'].push(z)
                                })
                            }
                        }
                        else {
                            data_list[i]['products'].forEach(m => {
                                this.category_list[cat_index]['products'].push(m)
                            })
                        }

                    }
                    else {
                        this.category_list.push(data_list[i])
                    }
                }
                console.log(res)
                console.log(this.all_product_category)
                this.all_product_category.forEach(k => {
                    var chk_cat_index = this.category_list.findIndex(l => l.id == k.id)
                    if (chk_cat_index == -1) {
                        this.category_list.push(k)
                    }
                    else if (chk_cat_index != -1 && k['sub_category'] != undefined) {
                        k['sub_category'].forEach(p => {
                            var chk_sub_cat_index = this.category_list[chk_cat_index]['sub_category'].findIndex(d => d.id == p.id)
                            if (chk_sub_cat_index == -1) {
                                this.category_list[chk_cat_index]['sub_category'].push(p)
                            }
                        })

                    }

                })
                console.log(this.category_list)
                this.visible_key = true
                this.loader.hide();
            },
            error => {
                this.loader.hide();
                // console.log(error)
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
                this.loader.hide();
                this.onNavItemTap('/created-app/' + this.app_id + '/products')
            },
            error => {
                this.loader.hide();
                // console.log(error)
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
                this.loader.hide();
                this.onNavItemTap('/created-app/' + this.app_id + '/products')
            },
            error => {
                this.loader.hide();
                // console.log(error)
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
