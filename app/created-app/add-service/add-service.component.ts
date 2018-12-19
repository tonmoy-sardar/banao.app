import { Component, OnInit, ViewContainerRef } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatedAppService } from "../../core/services/created-app.service";
import { LoadingIndicator } from "nativescript-loading-indicator"
import { Location } from '@angular/common';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { UploadSingleImageModalComponent } from "../../core/component/upload-single-image-modal/upload-single-image-modal.component";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { ExploreService } from "../../core/services/explore.service";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";
import {
    CFAlertDialog,
    DialogOptions,
    CFAlertGravity,
    CFAlertActionAlignment,
    CFAlertActionStyle,
    CFAlertStyle,
  } from 'nativescript-cfalert-dialog';
  import { Page } from "tns-core-modules/ui/page";
@Component({
    selector: "add-service",
    moduleId: module.id,
    templateUrl: "./add-service.component.html"
})
export class AddServiceComponent implements OnInit {
    form: FormGroup;
    private feedback: Feedback;
    app_id: string;
    parent_cat_id: string;
    sub_cat_id: string;
    product_details: any;
    product_data = {
        product_name: '',
        price: '0.00',
        discounted_price: '0.00',
        packing_charges: '0.00',
        tags: '',
        description: '',
        app_master: '',
        product_category: ''
    }
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
    options = {
        context: {},
        fullscreen: false,
        viewContainerRef: this.vcRef
    };
    product_image: string = '';
    key: string = '';
    parentCategoryList: ValueList<string>;
    parentCategoryError: boolean;
    subCategoryList: ValueList<string>;
    subCategoryError: boolean;
    isSubCategory: boolean;
    private cfalertDialog: CFAlertDialog;
    constructor(
        private routerExtensions: RouterExtensions,
        private CreatedAppService: CreatedAppService,
        private formBuilder: FormBuilder,
        private location: Location,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private exploreService: ExploreService,
        private page: Page
    ) {
        this.feedback = new Feedback();
        exploreService.homePageStatus(false);
        this.cfalertDialog = new CFAlertDialog();
    }

    ngOnInit(): void {

        this.page.on("loaded", (args) => {
            if (this.page.android) {
              this.page.android.setFitsSystemWindows(true);
            }
          });

        this.loader.show(this.lodaing_options);
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        if (full_location.length > 4) {
            this.key = full_location[4].trim();
        }

        this.form = this.formBuilder.group({
            product_name: ['', Validators.required],
            price: ['0.00', Validators.required],
            discounted_price: ['0.00'],
            packing_charges: ['0.00'],
            tags: [''],
            description: ['']
        });
        this.parentCategoryList = new ValueList<string>();
        this.subCategoryList = new ValueList<string>();
        this.getParentCategoryList()
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
    getParentCategoryList() {
        this.CreatedAppService.getParentCategoryList(this.app_id).subscribe(
            (res: any[]) => {
                console.log(res)
                this.parentCategoryList = new ValueList<string>();
                for (let i = 0; i < res.length; i++) {
                    this.parentCategoryList.push({
                        value: res[i]['id'],
                        display: res[i]['category_name'],
                    });
                }
                console.log(this.parentCategoryList)
                this.loader.hide()
            },
            error => {
                console.log(error)
                this.loader.hide()
            }
        )
    }

    getSubCategoryList(cat_id) {
        this.CreatedAppService.getSubCategoryListByCategory(this.app_id, cat_id).subscribe(
            (res: any[]) => {
                console.log(res)
                this.subCategoryList = new ValueList<string>();
                if (res[0].sub_category != undefined) {
                    if (res[0].sub_category.length > 0) {
                        this.isSubCategory = true;
                        for (let i = 0; i < res[0].sub_category.length; i++) {
                            this.subCategoryList.push({
                                value: res[0].sub_category[i]['id'],
                                display: res[0].sub_category[i]['category_name'],
                            });
                        }
                    }

                }
                this.loader.hide()
            },
            error => {
                console.log(error)
                this.loader.hide()
            }
        )
    }

    onCategorychange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}. New value is "${this.parentCategoryList.getValue(
            args.newIndex)}"`);
        this.parent_cat_id = this.parentCategoryList.getValue(
            args.newIndex);
        if (this.parent_cat_id != undefined) {
            this.parentCategoryError = false;
            this.getSubCategoryList(this.parent_cat_id)
        }

    }

    onSubCategorychange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}. New value is "${this.subCategoryList.getValue(
            args.newIndex)}"`);
        this.sub_cat_id = this.subCategoryList.getValue(
            args.newIndex);
        if (this.sub_cat_id != undefined) {
            this.subCategoryError = false;
        }
    }

    createProduct() {
        if (this.form.valid) {
            if (this.parent_cat_id == undefined) {
                this.parentCategoryError = true;
                return;
            }
            else if (this.parent_cat_id != undefined && this.sub_cat_id == undefined && this.isSubCategory) {
                this.subCategoryError = true;
                return;
            }
            else {
                this.product_data.app_master = this.app_id;
                if (this.parent_cat_id != undefined && this.sub_cat_id != undefined) {
                    this.product_data.product_category = this.sub_cat_id;
                }
                else {
                    this.product_data.product_category = this.parent_cat_id;
                }

                if (this.product_data.discounted_price == '') {
                    this.product_data.discounted_price = '0.00'
                }
                if (this.product_data.packing_charges == '') {
                    this.product_data.packing_charges = '0.00'
                }
                this.loader.show(this.lodaing_options);
                this.CreatedAppService.createProduct(this.product_data).subscribe(
                    res => {
                        this.loader.hide();


                        if (this.key != '') {
                            this.onNavItemTap('/created-app/' + this.app_id + '/products' + '/new')
                        }
                        else {

                            this.successNotification("Service added successfully");
                            // this.feedback.success({
                            //     title: 'Product added successfully',
                            //     backgroundColor: new Color("green"),
                            //     titleColor: new Color("black"),
                            //     position: FeedbackPosition.Bottom,
                            //     type: FeedbackType.Custom
                            // });
                            this.onNavItemTap('/created-app/' + this.app_id + '/products')
                        }

                    },
                    error => {
                        this.loader.hide();
                        console.log(error)
                    }
                )
            }


        }
        else {
            if (this.parent_cat_id == undefined) {
                this.parentCategoryError = true;
            }
            else if (this.parent_cat_id != undefined && this.sub_cat_id == undefined) {
                this.subCategoryError = true;
            }
            this.markFormGroupTouched(this.form)
        }


    }

    pickImage() {
        this.modal.showModal(UploadSingleImageModalComponent, this.options).then(res => {

            if (res != undefined) {
                if (res.camera == true) {

                    var _pic = 'data:image/png;base64,' + res.image;
                    this.product_image = _pic
                    this.product_data['product_image'] = this.product_image
                }
                else if (res.gallery == true) {

                    var _pic = 'data:image/png;base64,' + res.image
                    this.product_image = _pic
                    this.product_data['product_image'] = this.product_image
                }
            }
        })
    }

    markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }

    isFieldValid(field: string) {
        return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
    }

    displayFieldCss(field: string) {
        return {
            'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
            'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
        };
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
