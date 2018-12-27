import { Component, OnInit, ViewContainerRef } from '@angular/core';
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { LoadingIndicator } from "nativescript-loading-indicator"
import { CreatedAppService, RadioOption } from "../../core/services/created-app.service";
import { SecureStorage } from "nativescript-secure-storage";
// registerElement('CardView', () => CardView);

import { ExploreService } from "../../core/services/explore.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import * as Globals from '../../core/globals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { UploadSingleImageModalComponent } from "../../core/component/upload-single-image-modal/upload-single-image-modal.component";
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
    selector: "business-info",
    moduleId: module.id,
    templateUrl: "./business-info.component.html"
})
export class BusinessInfoComponent implements OnInit {
    form: FormGroup;
    user_id: string;
    category_list: any = [];
    base_url: string = Globals.img_base_url;
    processing = false;
    secureStorage: SecureStorage;
    create_app_data: any;

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
    logo: string = '';
    visible_key: boolean;
    radioOptions?: Array<RadioOption>;
    businessTypeOptions: Array<RadioOption>;
    is_product_service: number = 0;
    private cfalertDialog: CFAlertDialog;
    constructor(
        private exploreService: ExploreService,
        private createdAppService: CreatedAppService,
        private formBuilder: FormBuilder,
        private router: RouterExtensions,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private page: Page
    ) {
        this.secureStorage = new SecureStorage();
        this.cfalertDialog = new CFAlertDialog();
    }

    ngOnInit() {
        this.page.on("loaded", (args) => {
            if (this.page.android) {
              this.page.android.setFitsSystemWindows(true);
            }
          });
        this.user_id = getString('user_id');
        this.form = this.formBuilder.group({
            business_name: ['', Validators.required],
            business_description: ['', Validators.required],
            app_website_url: ['']
        });
        //this.getCategoryList();
        this.populateData();

        this.businessTypeOptions = [
            new RadioOption("Product", 1),
            new RadioOption("Service", 2)
        ]

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
                    this.logo = _pic
                }
                else if (res.gallery == true) {

                    var _pic = 'data:image/png;base64,' + res.image
                    this.logo = _pic
                }
            }
        })
    }


    populateData() {
        this.secureStorage.get({
            key: "create_app_data"
        }).then(
            value => {
                var data = JSON.parse(value);

                if (data != null) {
                    this.create_app_data = data;
                }
                else {

                }
            }
        );
    }
    submitCreateAppBusinessInfo() {
        if (this.form.valid) {

            var data = {
                app_category: this.create_app_data.app_category,
                business_name: this.form.value.business_name,
                business_description: this.form.value.business_description,
                app_website_url: this.form.value.app_website_url,
                is_product_service: this.is_product_service,
                logo: this.logo
            }


            this.setCreateAppData(data)
            this.router.navigate(['/app-create/owner-info'])
        }
        else {
            this.markFormGroupTouched(this.form)
        }
    }

    setCreateAppData(data) {
        this.secureStorage.set({
            key: 'create_app_data',
            value: JSON.stringify(data)
        }).then(success => {

        });
    };

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


    changeCheckedRadioBusinessType(radioOption: RadioOption): void {
        radioOption.selected = !radioOption.selected;
        this.is_product_service = radioOption.id
        if (!radioOption.selected) {
            return;
        }

        // uncheck all other options
        this.businessTypeOptions.forEach(option => {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
        });


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
    
      onNavBtnTap() {
        // This code will be called only in Android.
        this.router.back();
      }



}