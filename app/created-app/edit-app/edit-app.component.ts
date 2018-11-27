import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatedAppService, RadioOption} from "../../core/services/created-app.service";
import { LoadingIndicator } from "nativescript-loading-indicator"
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { ExploreService } from "../../core/services/explore.service";

@Component({
    selector: 'edit-app',
    moduleId: module.id,
    templateUrl: `edit-app.component.html`
})

export class EditAppComponent implements OnInit {
    form: FormGroup;
    private feedback: Feedback;
    app_id: string;
    app_details: any;
    app_data: any = {
        logo: '',
        business_name: '',
        business_description: '',
        app_website_url:'',
        is_product_service:'',
    }
    visible_key: boolean;
    radioOptions?: Array<RadioOption>;
    businessTypeOptions: Array<RadioOption>;
    loader = new LoadingIndicator();
    is_product_service: number;
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

    constructor(
        private route: ActivatedRoute,
        private CreatedAppService: CreatedAppService,
        private formBuilder: FormBuilder,
        private router: RouterExtensions,
        private location: Location,
        private exploreService: ExploreService
    ) { 
        this.feedback = new Feedback();
        exploreService.homePageStatus(false);
    }

    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.getAppDetails(this.app_id);

        this.form = this.formBuilder.group({
            business_name: ['', Validators.required],
            business_description: ['', Validators.required],
            app_website_url: [''],
            is_product_service: [''],
        });

        this.businessTypeOptions = [
            new RadioOption("Product", 1),
            new RadioOption("Service", 2)
        ]
    }

    getAppDetails(id) {
        this.loader.show(this.lodaing_options);
        this.CreatedAppService.getCreatedAppDetails(id).subscribe(
            res => {
                this.app_details = res;
                this.app_data.logo = this.app_details.logo;
                this.app_data.business_name = this.app_details.business_name;
                this.app_data.business_description = this.app_details.business_description;
                this.app_data.app_website_url = this.app_details.app_website_url;
                this.app_data.app_website_url = this.app_details.app_website_url;
                this.app_data.is_product_service = this.app_details.is_product_service;
                if(this.app_details.is_product_service ==1)
                {
                    this.businessTypeOptions[0]['selected'] = true;
                }
                else if(this.app_details.is_product_service ==2)
                {
                    this.businessTypeOptions[1]['selected'] = true;
                }
                this.visible_key = true
                
                this.loader.hide();

            },
            error => {
                console.log(error)
                this.loader.hide();
            }
        )
    }

    updateAppInfo() {
        if (this.form.valid) {
            
            var data = {
                business_name: this.form.value.business_name,
                business_description: this.form.value.business_description,
                app_website_url:this.form.value.app_website_url,
                is_product_service:this.is_product_service,
            }

            this.loader.show(this.lodaing_options);
            this.CreatedAppService.updateAppInfo(this.app_id, data).subscribe(
                res => {
                   
                    this.loader.hide();
                    this.feedback.success({
                        title: 'Your business details have been successfully updated',
                        backgroundColor: new Color("green"),
                        titleColor: new Color("black"),
                        position: FeedbackPosition.Bottom,
                        type: FeedbackType.Custom
                      });
                    this.router.navigate(['/created-app/' + this.app_id+'/manage-app'])

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