import { Component, OnInit, ViewContainerRef } from '@angular/core';
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ActivatedRoute } from "@angular/router";
import { CreatedAppService } from "../../core/services/created-app.service";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { UploadSingleImageModalComponent } from "../../core/component/upload-single-image-modal/upload-single-image-modal.component";
import { LoadingIndicator } from "nativescript-loading-indicator"
import { Location } from '@angular/common';
import { ExploreService } from "../../core/services/explore.service";


@Component({
  selector: 'manage-app',
  moduleId: module.id,
  templateUrl: `manage-app.component.html`
})

export class ManageAppComponent implements OnInit {
  app_id: string;
  app_details: any;
  app_data = {
    logo: '',
    business_name: ''
  }
  visible_key: boolean;
  serviceType;
  options = {
    context: {},
    fullscreen: false,
    viewContainerRef: this.vcRef
  };
  imageUrl: any;

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
    private router: RouterExtensions,
    private CreatedAppService: CreatedAppService,
    private modal: ModalDialogService,
    private vcRef: ViewContainerRef,
    private location: Location,
    private exploreService: ExploreService
  ) {
    exploreService.homePageStatus(false);
  }

  ngOnInit() {
    var full_location = this.location.path().split('/');
    this.app_id = full_location[2].trim();
    this.getAppDetails(this.app_id);
    this.imageUrl = null;
  }

  getAppDetails(id) {
    this.loader.show(this.lodaing_options);
    this.CreatedAppService.getCreatedAppDetails(id).subscribe(
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
        this.visible_key = true
        this.loader.hide();

      },
      error => {
        console.log(error)
        this.loader.hide();
      }
    )
  }

  pickLogo() {
    this.modal.showModal(UploadSingleImageModalComponent, this.options).then(res => {
      if (res != undefined) {
        if (res.camera == true) {
          this.imageUrl = res.image
          this.app_data.logo = 'data:image/png;base64,' + res.image;
          var data = {
            id: this.app_id,
            logo: 'data:image/png;base64,' + res.image
          }
          this.updateAppLogo(data);

        }
        else if (res.gallery == true) {
          this.imageUrl = res.image
          this.app_data.logo = 'data:image/png;base64,' + res.image;

          var data = {
            id: this.app_id,
            logo: 'data:image/png;base64,' + res.image
          }
          this.updateAppLogo(data);
        }
      }
    })
  }

  updateAppLogo(data) {
    this.loader.show(this.lodaing_options);
    this.CreatedAppService.editAppLogo(data).subscribe(
      res => {
        this.loader.hide();
        this.getAppDetails(this.app_id);
      },
      error => {
        this.loader.hide();
        console.log(error)
      }
    )
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
    // this.router.back();
    this.onNavItemTap('/created-app/' + this.app_id + '/details')
  }




}