import { Component,OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
@Component({
    selector: "action-bar",
    moduleId: module.id,
    templateUrl: "./action-bar.component.html",
})
export class ActionBarComponent implements OnInit{
    isLoggedin: boolean;
    constructor(
        private _routerExtensions: RouterExtensions
    ) {

    }

    ngOnInit() {
        if(getBoolean('isLoggedin')){
            this.isLoggedin = getBoolean('isLoggedin');
        }
    }

    logout(){
        clear();
        this._routerExtensions.navigate(["/login"], { clearHistory: true });
    }
}