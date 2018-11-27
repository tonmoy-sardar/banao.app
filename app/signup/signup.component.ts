import { Component, OnInit, ViewChild  } from "@angular/core";
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
import { LoadingIndicator } from "nativescript-loading-indicator"

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
  constructor(
    private page: Page,
    private router: RouterExtensions,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    //this.page.actionBarHidden = true;
    this.feedback = new Feedback();
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]],
      contact_no: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      password: ['', Validators.required],
      otp_flag: [0]
    });

    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });

  }


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
          this.feedback.error({
            title: error.error.message,
            backgroundColor: new Color("red"),
            titleColor: new Color("black"),
            position: FeedbackPosition.Bottom,
            type: FeedbackType.Custom
          });
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
         
          this.feedback.success({
            title: 'Your account is successfully created',
            backgroundColor: new Color("green"),
            titleColor: new Color("black"),
            position: FeedbackPosition.Bottom,
            type: FeedbackType.Custom
          });
          
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
      this.feedback.error({
        title: 'Please Enter Valid OTP',
        backgroundColor: new Color("red"),
        titleColor: new Color("black"),
        position: FeedbackPosition.Bottom,
        type: FeedbackType.Custom
      });

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
        this.feedback.error({
          title: error.error.message,
          backgroundColor: new Color("red"),
          titleColor: new Color("black"),
          position: FeedbackPosition.Bottom,
          type: FeedbackType.Custom
        });
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

}