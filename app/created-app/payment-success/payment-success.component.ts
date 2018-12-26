import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatedAppService } from "../../core/services/created-app.service";
import { RouterExtensions } from "nativescript-angular/router";
import { LoadingIndicator } from "nativescript-loading-indicator"
import { ExploreService } from "../../core/services/explore.service";
import * as utils from "tns-core-modules/utils/utils";
@Component({
    selector: 'payment-success',
    moduleId: module.id,
    templateUrl: `payment-success.component.html`
})
export class PaymentSuccessComponent implements OnInit {
    app_id: string;
    app_details: any;
    business_name:string
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
    constructor(
        private route: ActivatedRoute,
        private CreatedAppService: CreatedAppService,
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
        this.getAppDetails(this.app_id);
    }

    getAppDetails(id) {
        this.loader.show(this.lodaing_options);
        this.CreatedAppService.getCreatedAppDetails(id).subscribe(
            res => {
                this.app_details = res;
                this.business_name = this.app_details.business_name;
                this.visible_key = true
                this.loader.hide();
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }

    openWebUrl() {
        utils.openUrl('https://play.google.com/store/apps/details?id=org.nativescript.banao.partner')
    }

    ok() {
        this.router.navigate(['/dashboard'])
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
}