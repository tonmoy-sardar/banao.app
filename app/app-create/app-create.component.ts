import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { CreatedAppService } from "../core/services/created-app.service";
import { Page } from "tns-core-modules/ui/page";
import * as Globals from '../core/globals';


@Component({
    selector: "app-create",
    moduleId: module.id,
    templateUrl: "./app-create.component.html"
})
export class AppCreateComponent implements OnInit {
    constructor(
        private page: Page,
        private route: ActivatedRoute,
        private CreatedAppService: CreatedAppService
      ) {}
    
      ngOnInit() {
        this.page.actionBarHidden = true;
      }
    
}