import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { CreatedAppService } from "../../services/created-app.service";
import { ExploreService } from "../../services/explore.service";

@Component({
    selector: "app-action-bar",
    moduleId: module.id,
    templateUrl: "./app-action-bar.component.html",
})
export class AppActionBarComponent implements OnInit {
    app_details: any;
    product_list: any = [];
    @Input('appId') appId: string;
    visible_key: boolean
    isLoggedin: boolean;
    homePageStatus: boolean = false;
    constructor(
        private _routerExtensions: RouterExtensions,
        private createdAppService: CreatedAppService,
        private routerExtensions: RouterExtensions,
        private exploreService: ExploreService
    ) {
        exploreService.getHomePageStatus.subscribe(status => this.changePageStatus(status));
    }

    private changePageStatus(status: boolean): void {
        this.homePageStatus = status;
        // if (this.homePageStatus == true) {
            
        // }
    }

    ngOnInit() {
        if(getBoolean('isLoggedin')){
            this.isLoggedin = getBoolean('isLoggedin');
        }
        this.getAppDetails(this.appId);
    }    

    getAppDetails(id) {
        this.createdAppService.getCreatedAppDetails(id).subscribe(
            res => {
                this.app_details = res;
                this.app_details.app_product_categories.forEach(x => {
                    x.products.forEach(y => {
                        this.product_list.push(y)
                    })
                })
                this.visible_key = true;
            },
            error => {
                this.visible_key = true;
                console.log(error)
            }
        )
    }
    goBack() {
        this.routerExtensions.back();
    }

    logout(){
        clear();
        this._routerExtensions.navigate(["/login"], { clearHistory: true });
    }

    navigateToHome(){
        console.log(this.homePageStatus)        
        if(this.homePageStatus){
            this._routerExtensions.navigate(["/dashboard"]);
        }
        else{
            this._routerExtensions.navigate(["/created-app",this.appId,'details']);
        }
        
    }

    
}