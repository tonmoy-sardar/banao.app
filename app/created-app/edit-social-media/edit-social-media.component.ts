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
import { FORMS_DIRECTIVES } from 'nativescript-angular/forms';
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { ExploreService } from "../../core/services/explore.service";

@Component({
    selector: 'edit-social-media',
    moduleId: module.id,
    templateUrl: `edit-social-media.component.html`
})

export class EditSocialMediaComponent implements OnInit {
    form: FormGroup;
    app_id: string;
    visible_key: boolean;
    social_media_type: any;
    app_social_media: any;

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
    social_media_data_set: any = [
        {

        }
    ]
    private feedback: Feedback;
    constructor(
        private route: ActivatedRoute,
        private CreatedAppService: CreatedAppService,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private formBuilder: FormBuilder,
        private router: RouterExtensions,
        private location: Location,
        private exploreService: ExploreService
    ) {
        exploreService.homePageStatus(false);
    }

    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.getAppSocialMedia(this.app_id);
        this.feedback = new Feedback();
    }



    getSocialMediaType() {

        this.CreatedAppService.getSocialMediaType().subscribe(
            (data: any[]) => {
                this.social_media_type = data;
                for (var i = 0; i < this.social_media_type.length; i++) {


                    var d = this.app_social_media.filter(x => x.social_media_type == this.social_media_type[i].id)
                    if (d.length > 0) {
                        this.social_media_type[i]['url'] = d[0]['url']
                    }
                    else {
                        this.social_media_type[i]['url'] = '';
                    }
                }
                this.visible_key = true
                this.loader.hide();

            },
            error => {
                console.log(error)
                this.loader.hide();
            }
        );
    };


    getSocialIconUnicode(id) {
        if (id == 1) {
            return String.fromCharCode(0xf09a)
            // this.social_media_type[i]['unicode'] = '&#xf09a;'
        }
        else if (id == 2) {
            return String.fromCharCode(0xf099)
            //this.social_media_type[i]['unicode'] = '&#xf099;'
        }
        else if (id == 3) {
            return String.fromCharCode(0xf16d)
            //this.social_media_type[i]['unicode'] = '&#xf16d;'
        }
        else if (id == 4) {
            return String.fromCharCode(0xf0d5)
            //this.social_media_type[i]['unicode'] = '&#xf0d5;'
        }
        else if (id == 5) {
            return String.fromCharCode(0xf167)
            //this.social_media_type[i]['unicode'] = '&#xf167;'
        }
        else if (id == 6) {
            return String.fromCharCode(0xf0e1)
            //this.social_media_type[i]['unicode'] = '&#xf0e1;'
        }
    }

    getAppSocialMedia(id) {
        this.loader.show(this.lodaing_options);
        this.CreatedAppService.getAppSocialMedia(id).subscribe(
            res => {
                this.app_social_media = res;
                this.getSocialMediaType();
            },
            error => {
                console.log(error)
                this.loader.hide();
            }
        )
    }

    update() {
        var data = [];
        for (var i = 0; i < this.social_media_type.length; i++) {
            if (this.social_media_type[i]['url'] != '') {
                var d = {
                    app_master: this.app_id,
                    social_media_type: this.social_media_type[i]['id'],
                    url: this.social_media_type[i]['url'].toLowerCase()
                }
                data.push(d)
            }
        }
        this.loader.show(this.lodaing_options);
        this.CreatedAppService.updateAppSocialMedia(data).subscribe(
            res => {
                this.loader.hide();
                this.feedback.success({
                    title: 'Social media links have been successfully updated',
                    backgroundColor: new Color("green"),
                    titleColor: new Color("black"),
                    position: FeedbackPosition.Bottom,
                    type: FeedbackType.Custom
                });
                this.router.navigate(['/created-app/' + this.app_id + '/manage-app'])
            },
            error => {
                console.log(error)
                this.loader.hide();
            }
        )
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