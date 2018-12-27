import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";

@Injectable()
export class AuthGuard implements CanLoad {
    user_id: string;
    logged_user_group: string;
    constructor(private _routerExtensions: RouterExtensions) {
        this.user_id = getString('user_id');
        this.logged_user_group = getString('logged_user_group');
    }

    canLoad(): boolean {
        if (getBoolean('isLoggedin')) {
            if (this.logged_user_group == undefined) {
                this._routerExtensions.navigate(["/dashboard/" + this.user_id], { clearHistory: true });
                return true;
            }
            else {
                this._routerExtensions.navigate(["/franchise-user"], { clearHistory: true });
                return true;
            }

        }
        this._routerExtensions.navigate(["/login"], { clearHistory: true });
        return false;
    }
}