import { Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../core/services/login.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { LoadingIndicator } from "nativescript-loading-indicator"
import {
  CFAlertDialog,
  DialogOptions,
  CFAlertGravity,
  CFAlertActionAlignment,
  CFAlertActionStyle,
  CFAlertStyle,
} from 'nativescript-cfalert-dialog';
import { Page } from "tns-core-modules/ui/page";
import * as utils from "tns-core-modules/utils/utils";
@Component({
  selector: "signup",
  moduleId: module.id,
  templateUrl: "./signup.component.html"
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  private feedback: Feedback;
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
  otpForm: FormGroup;
  showOtpSection = false;
  otp: string;
  private cfalertDialog: CFAlertDialog;
  constructor(
    private page: Page,
    private router: RouterExtensions,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    //this.page.actionBarHidden = true;
    this.feedback = new Feedback();
    this.cfalertDialog = new CFAlertDialog();
  }

  ngOnInit() {
    this.page.on("loaded", (args) => {
      if (this.page.android) {
        this.page.android.setFitsSystemWindows(true);
      }
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]],
      contact_no: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      password: ['', Validators.required],
      otp_flag: [0],
      terms: [false, [
        Validators.required,
        Validators.pattern('true')
      ]],
    });

    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });

  }

  successNotification = function (msg) {
    let options: DialogOptions = {
      dialogStyle: CFAlertStyle.NOTIFICATION,
      title: '',
      message: msg,
      backgroundBlur: true,
      cancellable: true,
      messageColor: '#008000',
    };
    this.cfalertDialog.show(options);
    setTimeout(() => this.cfalertDialog.dismiss(true), 2000);
  };

  errorNotification = function (msg) {
    let options: DialogOptions = {
      dialogStyle: CFAlertStyle.NOTIFICATION,
      title: '',
      message: msg,
      backgroundBlur: true,
      cancellable: true,
      messageColor: '#DC1431',
    };
    this.cfalertDialog.show(options);
    setTimeout(() => this.cfalertDialog.dismiss(true), 2000);
  };


  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  signUp() {
    if (this.form.valid) {
      this.loader.show(this.lodaing_options);
      this.loginService.signup(this.form.value).subscribe(
        res => {
          this.loader.hide();
          this.otp = res.otp
          this.showOtpSection = true;
        },
        error => {
          this.loader.hide();
          console.log(error)
          this.errorNotification(error.error.message);
        }
      )
    }
    else {
      this.markFormGroupTouched(this.form)
    }
  }

  submitOtp() {
    if (this.otp.toLowerCase() == this.otpForm.value.otp.toLowerCase()) {
      this.loader.show(this.lodaing_options);
      this.form.patchValue({
        otp_flag: 1
      })
      this.loginService.signup(this.form.value).subscribe(
        res => {

          this.successNotification("Your account is successfully created");


          this.loader.hide();

          var navItemRoute = '/login'
          this.router.navigate([navItemRoute], {
            transition: {
              name: "fade"
            }
          });
          const sideDrawer = <RadSideDrawer>app.getRootView();
          sideDrawer.closeDrawer();
        },
        error => {
          this.loader.hide();
          console.log(error)
        }
      )
    }
    else {

      this.errorNotification('Please Enter Valid OTP');


    }
  }

  resendOtp() {
    this.loader.show(this.lodaing_options);
    this.loginService.signup(this.form.value).subscribe(
      res => {
        this.loader.hide();
        this.otp = res.otp;
      },
      error => {
        this.loader.hide();
        console.log(error)
        this.errorNotification(error.error.message);
      }
    )
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'is-invalid': form.get(field).invalid && (form.get(field).dirty || form.get(field).touched),
      'is-valid': form.get(field).valid && (form.get(field).dirty || form.get(field).touched)
    };
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

  goToUrl(url) {
    utils.openUrl(url)
  }

}