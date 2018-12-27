import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { LoadingIndicator } from "nativescript-loading-indicator"
import { CreatedAppService } from "../../core/services/created-app.service";
import { SecureStorage } from "nativescript-secure-storage";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ExploreService } from "../../core/services/explore.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import * as Globals from '../../core/globals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
    CFAlertDialog,
    DialogOptions,
    CFAlertGravity,
    CFAlertActionAlignment,
    CFAlertActionStyle,
    CFAlertStyle,
} from 'nativescript-cfalert-dialog';
import { Page } from "tns-core-modules/ui/page";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "franchise-info",
    moduleId: module.id,
    templateUrl: "./franchise-info.component.html"
})
export class FranchiseInfoComponent implements OnInit {
    form: FormGroup;
    user_id: string;

    base_url: string = Globals.img_base_url;
    processing = false;
    secureStorage: SecureStorage;
    create_app_data: any;

    franchise_user_details: any = {
        name: '',
        contact_no: '',
        email: '',
        password: ''
    }

    options = {
        context: {},
        fullscreen: false,
        viewContainerRef: this.vcRef
    };

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
    private cfalertDialog: CFAlertDialog;
    otpForm: FormGroup;
    showOtpSection = false;
    otp: string;
    constructor(
        private exploreService: ExploreService,
        private createdAppService: CreatedAppService,
        private modal: ModalDialogService,
        private formBuilder: FormBuilder,
        private router: RouterExtensions,
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
            name: ['', Validators.required],
            email: ['', [
                Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
            ]],
            contact_no: ['', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10)
            ]],
            password: ['', Validators.required],
        });
        this.otpForm = this.formBuilder.group({
            otp: ['', Validators.required]
        });
        this.loader.show(this.lodaing_options);
        this.populateData();

    }



    populateData() {
        this.secureStorage.get({
            key: "create_app_data"
        }).then(
            value => {
                var data = JSON.parse(value);
                this.loader.hide();
                if (data != null) {
                    this.create_app_data = data;
                }
                else {

                }
            }
        );
    }

    submitFranchiseInfo() {
        if (this.form.valid) {

            this.loader.show(this.lodaing_options);
            let data = {
                user_id: this.user_id,
                email_id: this.franchise_user_details.email,
                contact_no: this.franchise_user_details.contact_no
            }

            this.createdAppService.sendAppCreateOtp(data).subscribe(
                response => {
                    this.loader.hide();
                    this.otp = response['otp']
                    this.showOtpSection = true;
                },
                error => {                    
                    dialogs.confirm({
                        title: "",
                        message: error.error.msg,
                        okButtonText: "Yes",
                        cancelButtonText: "No"
                    }).then(result => {
                        if (result) {
                            var app_data = {
                                app_category: this.create_app_data.app_category,
                                business_name: this.create_app_data.business_name,
                                business_description: this.create_app_data.business_description,
                                app_website_url: this.create_app_data.app_website_url,
                                is_product_service: this.create_app_data.is_product_service,
                                logo: this.create_app_data.logo,
                                store_address: this.create_app_data.store_address,
                                lat: this.create_app_data.lat,
                                long: this.create_app_data.long,
                                owner_name: this.create_app_data.owner_name,
                                owner_designation: this.create_app_data.owner_designation,
                                business_est_year: this.create_app_data.business_est_year,
                                owner_pic: this.create_app_data.owner_pic,
                                franchise_id: this.user_id,
                                user_id: error.error.user_id
                            }                
                            this.createOriginalAppByFranchise(app_data)
                        }
                        else{
                            this.loader.hide();
                        }
                    });
                }
            )

        }
        else {
            this.markFormGroupTouched(this.form)
        }
    }

    submitOtp() {
        if (this.otp.toLowerCase() == this.otpForm.value.otp.toLowerCase()) {
            this.loader.show(this.lodaing_options);
            var data = {
                app_category: this.create_app_data.app_category,
                business_name: this.create_app_data.business_name,
                business_description: this.create_app_data.business_description,
                app_website_url: this.create_app_data.app_website_url,
                is_product_service: this.create_app_data.is_product_service,
                logo: this.create_app_data.logo,
                store_address: this.create_app_data.store_address,
                lat: this.create_app_data.lat,
                long: this.create_app_data.long,
                owner_name: this.create_app_data.owner_name,
                owner_designation: this.create_app_data.owner_designation,
                business_est_year: this.create_app_data.business_est_year,
                owner_pic: this.create_app_data.owner_pic,
                franchise_id: this.user_id,
                user_name: this.franchise_user_details.name,
                contact_no: this.franchise_user_details.contact_no,
                email_id: this.franchise_user_details.email,
                password: this.franchise_user_details.password,
                user_id: 0
            }

            this.createOriginalAppByFranchise(data)

        }
        else {
            this.errorNotification('Please Enter Valid OTP');
        }
    }

    createOriginalAppByFranchise(data) {
        this.createdAppService.createOriginalAppByFranchise(data).subscribe(
            res => {
                var d = {};
                this.setCreateAppData(d)
                this.loader.hide()
                this.router.navigate(['/created-app/' + res['id'] + '/edit-business-images/' + 'new'])
            },
            error => {
                console.log(error)
                this.loader.hide()
            }
        )
    }

    resendOtp() {
        this.loader.show(this.lodaing_options);
        let data = {
            user_id: this.user_id,
            email_id: this.franchise_user_details.email,
            contact_no: this.franchise_user_details.contact_no
        }

        this.createdAppService.sendAppCreateOtp(data).subscribe(
            response => {
                this.loader.hide();
                this.otp = response['otp']
            },
            error => {
                this.loader.hide();
            }
        )
    }

    setCreateAppData(data) {
        this.secureStorage.set({
            key: 'create_app_data',
            value: JSON.stringify(data)
        }).then(success => {

        });
    };

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

    markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'is-invalid': form.get(field).invalid && (form.get(field).dirty || form.get(field).touched),
            'is-valid': form.get(field).valid && (form.get(field).dirty || form.get(field).touched)
        };
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