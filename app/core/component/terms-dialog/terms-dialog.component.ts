import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
@Component({
  selector: 'app-terms-dialog',
  moduleId: module.id,
  templateUrl: './terms-dialog.component.html',
})
export class TermsDialogComponent implements OnInit {

  constructor(
    private params: ModalDialogParams
  ) { }

  ngOnInit() {
  }


  modalClose() {
    this.params.closeCallback({ "close": true });
  }
}
