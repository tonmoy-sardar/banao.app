import { Component, OnInit, ViewContainerRef } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatedAppService } from "../../core/services/created-app.service";
import { LoadingIndicator } from "nativescript-loading-indicator"
import { Location } from '@angular/common';
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { ExploreService } from "../../core/services/explore.service";
import {
    CFAlertDialog,
    DialogOptions,
    CFAlertGravity,
    CFAlertActionAlignment,
    CFAlertActionStyle,
    CFAlertStyle,
} from 'nativescript-cfalert-dialog';
import { Page } from "tns-core-modules/ui/page";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { UploadSingleImageModalComponent } from "../../core/component/upload-single-image-modal/upload-single-image-modal.component";

@Component({
    selector: "edit-category",
    moduleId: module.id,
    templateUrl: "./edit-category.component.html"
})
export class EditCategoryComponent implements OnInit {
    form: FormGroup;
    processing = false;
    private feedback: Feedback;
    app_id: string;
    product_category_data = {
        category_name: '',
        description: '',
        app_master: '',
        parent_category_id: 0
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
    key: string = '';
    product_category_id: string;
    product_category_details: any;
    category_image: string = '';
    options = {
        context: {},
        fullscreen: false,
        viewContainerRef: this.vcRef
    };
    private cfalertDialog: CFAlertDialog;
    constructor(
        private routerExtensions: RouterExtensions,
        private CreatedAppService: CreatedAppService,
        private formBuilder: FormBuilder,
        private location: Location,
        private exploreService: ExploreService,
        private page: Page,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
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
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.product_category_id = full_location[4].trim();
        if (full_location.length > 5) {
            this.key = full_location[5].trim();
        }
        this.getProductCategoryDetails(this.product_category_id);
        this.form = this.formBuilder.group({
            category_name: ['', Validators.required],
            description: ['']
        });
    }

    getProductCategoryDetails(id) {
        this.loader.show(this.lodaing_options);
        this.CreatedAppService.getProductCategoryDetails(id).subscribe(
            res => {
                this.product_category_details = res;
                this.product_category_data.category_name = this.product_category_details.category_name;
                this.product_category_data.description = this.product_category_details.description;
                this.product_category_data.app_master = this.app_id;
                this.category_image = this.product_category_details.category_image
                this.visible_key = true
                this.loader.hide();
            },
            error => {
                console.log(error)
                this.loader.hide();
            }
        )
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

    pickImage() {
        this.modal.showModal(UploadSingleImageModalComponent, this.options).then(res => {

            if (res != undefined) {
                if (res.camera == true) {

                    var _pic = 'data:image/png;base64,' + res.image;
                    this.category_image = _pic
                    this.product_category_data['category_image'] = this.category_image
                }
                else if (res.gallery == true) {

                    var _pic = 'data:image/png;base64,' + res.image
                    this.category_image = _pic
                    this.product_category_data['category_image'] = this.category_image
                }
            }
        })
    }


    updateProductCategory() {
        if (this.form.valid) {
            this.loader.show(this.lodaing_options);
            this.CreatedAppService.updateProductCategory(this.product_category_id, this.product_category_data).subscribe(
                res => {
                    this.loader.hide();

                    if (this.key != '') {
                        this.onNavItemTap('/created-app/' + this.app_id + '/products' + '/new')
                    }
                    else {
                        this.successNotification("Category updated successfully");

                        this.onNavItemTap('/created-app/' + this.app_id + '/products')
                    }

                },
                error => {
                    this.loader.hide();
                    console.log(error)
                }
            )

        }
        else {
            this.markFormGroupTouched(this.form)
        }
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
