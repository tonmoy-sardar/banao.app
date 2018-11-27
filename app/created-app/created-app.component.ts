import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CreatedAppService } from "../core/services/created-app.service";
import { Page } from "tns-core-modules/ui/page";
import * as Globals from '../core/globals';

@Component({
  selector: 'created-app',
  moduleId: module.id,
  templateUrl: `created-app.component.html`
})
export class CreatedAppComponent implements OnInit {
  app_id: string;
  
  constructor(
    private page: Page,
    private route: ActivatedRoute,
    private CreatedAppService: CreatedAppService
  ) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.app_id = this.route.snapshot.params["id"];
    
  }

}