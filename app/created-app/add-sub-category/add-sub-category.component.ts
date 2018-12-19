import { Component, OnInit } from "@angular/core";
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

@Component({
    selector: "add-sub-category",
    moduleId: module.id,
    templateUrl: "./add-sub-category.component.html"
})
export class AddSubCategoryComponent implements OnInit {
    form: FormGroup;
    processing = false;
    private feedback: Feedback;
    app_id: string;
    product_category_data = {
        category_name: '',
        description: '',
        app_master: '',
        parent_category_id: ''
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
    cat_id: string;
    private cfalertDialog: CFAlertDialog;
    constructor(
        private routerExtensions: RouterExtensions,
        private CreatedAppService: CreatedAppService,
        private formBuilder: FormBuilder,
        private location: Location,
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
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.cat_id = full_location[4].trim();
        if (full_location.length > 5) {
            this.key = full_location[5].trim();
        }
        this.form = this.formBuilder.group({
            category_name: ['', Validators.required],
            description: ['']
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
    createProductCategory() {
        if (this.form.valid) {

            this.product_category_data.app_master = this.app_id;
            this.product_category_data.parent_category_id = this.cat_id;
            this.loader.show(this.lodaing_options);
            this.CreatedAppService.createProductCategory(this.product_category_data).subscribe(
                res => {
                    this.loader.hide();
                    if (this.key != '') {
                        this.onNavItemTap('/created-app/' + this.app_id + '/products' + '/new')
                    }
                    else {
                        this.successNotification("Category added successfully");
                        
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
