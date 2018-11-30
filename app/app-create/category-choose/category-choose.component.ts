import { Component, OnInit } from '@angular/core';
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { LoadingIndicator } from "nativescript-loading-indicator"
import { CreatedAppService } from "../../core/services/created-app.service";
import { SecureStorage } from "nativescript-secure-storage";
// registerElement('CardView', () => CardView);

import { ExploreService } from "../../core/services/explore.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import * as Globals from '../../core/globals';


@Component({
    selector: "category-choose",
    moduleId: module.id,
    templateUrl: "./category-choose.component.html"
})
export class CategoryChooseComponent implements OnInit {
    user_id: string;
    category_list: any = [];
    base_url: string = Globals.img_base_url;
    totalCategory;
    visible_key: boolean;

    secureStorage: SecureStorage;

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
        private exploreService: ExploreService,
        private createdAppService: CreatedAppService,
        private router: RouterExtensions,
    ) {
        this.secureStorage = new SecureStorage();
        //exploreService.homePageStatus(false);
    }

    ngOnInit() {
        this.user_id = getString('user_id');
       
        this.getCategoryList();

    }

    chooseCategory(id)
    {
        var data = {
            app_category: id
        }
        this.setCreateAppData(data);
        var navItemRoute = "/app-create/business-info"
        this.router.navigate([navItemRoute], {
            transition: {
              name: "fade"
            }
          });
      
          const sideDrawer = <RadSideDrawer>app.getRootView();
          sideDrawer.closeDrawer();


        // this.router.navigate(['/app-create/business-info'])
    }

    setCreateAppData(data) {
        this.secureStorage.set({
            key: 'create_app_data',
            value: JSON.stringify(data)
        }).then(success => {
        });
    };

    getCategoryList() {
        this.loader.show(this.lodaing_options);
        this.createdAppService.getCategoryList().subscribe(
          res => {
            this.category_list = res;
            this.totalCategory = res.length;
            console.log(this.category_list)
            this.visible_key = true
            this.loader.hide();
          },
          error => {
            console.log(error)
            this.loader.hide();
          }
        )
      }

      onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
      }
    
      onNavItemTap(navItemRoute: string): void {
    
    
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