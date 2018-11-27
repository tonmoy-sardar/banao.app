import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { CreatedAppService } from "../../services/created-app.service";

@Component({
    selector: "create-app-action-bar",
    moduleId: module.id,
    templateUrl: "./create-app-action-bar.component.html",
})
export class CreateAppActionBarComponent implements OnInit {
 
    isLoggedin: boolean;
    constructor(
        private _routerExtensions: RouterExtensions,
        private createdAppService: CreatedAppService,
        private routerExtensions: RouterExtensions
    ) {

    }

    ngOnInit() {
        if(getBoolean('isLoggedin')){
            this.isLoggedin = getBoolean('isLoggedin');
        }
        
    }    

    goBack() {
        this.routerExtensions.back();
    }

    logout(){
        clear();
        this._routerExtensions.navigate(["/login"], { clearHistory: true });
    }

    navigateToHome(){
        this._routerExtensions.navigate(["/dashboard"]);
    }

}