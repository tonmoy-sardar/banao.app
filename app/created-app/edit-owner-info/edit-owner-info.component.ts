import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatedAppService } from "../../core/services/created-app.service";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { UploadSingleImageModalComponent } from "../../core/component/upload-single-image-modal/upload-single-image-modal.component";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";
import { LocationModalComponent } from '../../core/component/location-modal/location-modal.component';
import * as Globals from '../../core/globals';
import { LoadingIndicator } from "nativescript-loading-indicator";
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
    selector: 'edit-owner-info',
    moduleId: module.id,
    templateUrl: `edit-owner-info.component.html`
})

export class EditOwnerInfoComponent implements OnInit {
    form: FormGroup;
    private feedback: Feedback;
    app_id: string;
    visible_key: boolean;
    app_details: any;
    owner_details: any = {
        owner_name: '',
        owner_designation: '',
        owner_pic: '',
        business_est_year: '',
        store_address: '',
        lat: '',
        long: ''
    }
    options = {
        context: {},
        fullscreen: false,
        viewContainerRef: this.vcRef
    };
    owner_data: any = {
        owner_name: '',
        owner_designation: '',
        business_est_year: '',
        store_address: '',
        lat: '',
        long: ''
    }

    selectedIndex: number = null;
    hint = "User's designation";
    designations: ValueList<string>;

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
    constructor(
        private route: ActivatedRoute,
        private CreatedAppService: CreatedAppService,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private formBuilder: FormBuilder,
        private router: RouterExtensions,
        private location: Location,
        private exploreService: ExploreService,
        private page: Page
    ) {
        this.feedback = new Feedback();
        exploreService.homePageStatus(false);
        this.cfalertDialog = new CFAlertDialog();
    }

    ngOnInit() {
        this.page.on("loaded", (args) => {
            if (this.page.android) {
              this.page.android.setFitsSystemWindows(true);
            }
          });
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.form = this.formBuilder.group({
            owner_name: ['', Validators.required],
            owner_designation: [''],
            business_est_year: [''],
            store_address: [''],
            lat: [''],
            long: ['']
        });

        this.getDesignationDropdown();
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

    onchange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}. New value is "${this.designations.getValue(
            args.newIndex)}"`);
        this.owner_details.owner_designation = this.designations.getValue(
            args.newIndex);
    }

    getDesignationDropdown() {
        
        this.CreatedAppService.getDesignationDropdown().subscribe(
            (data: any[]) => {
                this.designations = new ValueList<string>();
                for (let i = 0; i < data.length; i++) {
                    this.designations.push({
                        value: data[i]['id'],
                        display: data[i]['designation_name'],
                    });
                }
                this.getAppOwnerDetails(this.app_id);
            },
            error => {
                console.log(error)
            }
        );
    };

    getAppOwnerDetails(id) {
        this.loader.show(this.lodaing_options);
        this.CreatedAppService.getOwnerInfo(id).subscribe(
            res => {
                this.owner_details = res;
                this.selectedIndex = this.designations.getIndex(this.owner_details.owner_designation.toString());
                this.visible_key = true
                this.loader.hide();
            },
            error => {
                console.log(error)
                this.loader.hide();
            }
        )
    }

    searchLocation() {
        var option = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(LocationModalComponent, option).then(res => {

            if (res.name != "") {
                this.owner_details.store_address = res.name;
                this.owner_details.lat = res.latitude;
                this.owner_details.long = res.longitude
                // data.structured_formatting.main_text
            }
        })
    }

    pickLogo() {
        this.modal.showModal(UploadSingleImageModalComponent, this.options).then(res => {

            if (res != undefined) {
                if (res.camera == true) {
                    this.owner_details.owner_pic = 'data:image/png;base64,' + res.image;
                    var data = {
                        id: this.app_id,
                        owner_pic: 'data:image/png;base64,' + res.image
                    }
                    this.updateOwnerLogo(data);
                }
                else if (res.gallery == true) {
                    var data = {
                        id: this.app_id,
                        owner_pic: 'data:image/png;base64,' + res.image
                    }
                    this.updateOwnerLogo(data);
                    this.owner_details.owner_pic = 'data:image/png;base64,' + res.image
                }
            }
        })
    }

    updateOwnerLogo(data) {
        this.loader.show(this.lodaing_options);
        this.CreatedAppService.editOwnerLogo(data).subscribe(
            res => {
                this.loader.hide();
                this.successNotification("Owner image updated successfully");
               
                this.getAppOwnerDetails(this.app_id);

            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }


    updateOwnerInfo() {
        if (this.form.valid) {

            this.owner_data = {
                id: this.app_id,
                owner_name: this.owner_details.owner_name,
                owner_designation: this.owner_details.owner_designation,
                business_est_year: this.owner_details.business_est_year,
                store_address: this.owner_details.store_address,
                lat: this.owner_details.lat,
                long: this.owner_details.long
            }
            this.loader.show(this.lodaing_options);
            this.CreatedAppService.editOwnerInfo(this.owner_data).subscribe(
                res => {
                    this.loader.hide();
                    this.successNotification("Owner details have been successfully updated");
                    
                    this.router.navigate(['/created-app/' + this.app_id+'/manage-app'])
                    // this.getAppOwnerDetails(res['id'])
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