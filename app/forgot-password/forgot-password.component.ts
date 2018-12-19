import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../core/services/login.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { LoadingIndicator } from "nativescript-loading-indicator";

import {
  CFAlertDialog,
  DialogOptions,
  CFAlertGravity,
  CFAlertActionAlignment,
  CFAlertActionStyle,
  CFAlertStyle,
} from 'nativescript-cfalert-dialog';


@Component({
  selector: "forgot-password",
  moduleId: module.id,
  templateUrl: "./forgot-password.component.html"
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;

  processing = false;
  showOtpSection = false;
  newPwdSection = false;
  contact_no;
  otp_check;

  private feedback: Feedback;
  loader = new LoadingIndicator();
  otp;
  
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

  private cfalertDialog: CFAlertDialog;
  constructor(
    private page: Page,
    private router: RouterExtensions,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
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
      contact_no: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]]
    });

    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      conf_password: ['', Validators.required]
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

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'is-invalid': form.get(field).invalid && (form.get(field).dirty || form.get(field).touched),
      'is-valid': form.get(field).valid && (form.get(field).dirty || form.get(field).touched)
    };
  }



  customerForgotPasswordOtp() {

    if (this.form.valid) {
      this.loader.show(this.lodaing_options);
      this.contact_no = this.form.value.contact_no;
      this.loginService.userForgetPasswordOtp(this.form.value).subscribe(
        res => {
          this.loader.hide();
          this.otp = res.otp
          this.showOtpSection = true;
        },
        error => {

          this.loader.hide();
          console.log(error)
          this.errorNotification(error.error.msg);
          
        }
      )
    }
    else {
      this.markFormGroupTouched(this.form)
    }
  }

  resendOtp() {
    this.loader.show(this.lodaing_options);

    var data = {
      contact_no: this.contact_no
    }
    this.loginService.userForgetPasswordOtp(data).subscribe(
      res => {
        this.loader.hide();
        this.otp = res.otp
        this.showOtpSection = true;
      },
      error => {

        this.loader.hide();
        console.log(error)
        this.errorNotification(error.error.msg);
      }
    )
  }

  submitOtp() {
    if (this.otp == this.otpForm.value.otp) {

      this.newPwdSection = true;
      this.otp_check = 1;
    }
    else {
      this.errorNotification('Please Enter Valid OTP');
      

    }
  }
  submitNewPwd() {

    if (this.passwordForm.valid) {
      if (this.passwordForm.value.conf_password != this.passwordForm.value.password) {

        this.errorNotification('Password & Confirm Password are not same');
        
      }
      else {
        this.loader.show(this.lodaing_options);
        var data = {
          contact_no: this.contact_no,
          otp_check: this.otp_check,
          password: this.passwordForm.value.password
        }
        this.loginService.userForgetPasswordUpdate(data).subscribe(
          res => {
            this.loader.hide();
            this.successNotification("Password has been successfully changed.");
            

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
            this.errorNotification(error.error.msg);
          }
        )

      }

    }
    else {
      this.markFormGroupTouched(this.form)
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  skip() {
    setBoolean("isSkipped", true)
    this.router.navigate(['/'])
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



}