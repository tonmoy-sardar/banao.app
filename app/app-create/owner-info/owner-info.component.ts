import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';

import { LoadingIndicator } from "nativescript-loading-indicator"
import { CreatedAppService } from "../../core/services/created-app.service";
import { SecureStorage } from "nativescript-secure-storage";
// registerElement('CardView', () => CardView);
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ExploreService } from "../../core/services/explore.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import * as Globals from '../../core/globals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterExtensions } from "nativescript-angular/router";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";
import { LocationModalComponent } from '../../core/component/location-modal/location-modal.component';
import { UploadSingleImageModalComponent } from "../../core/component/upload-single-image-modal/upload-single-image-modal.component";

@Component({
    selector: "owner-info",
    moduleId: module.id,
    templateUrl: "./owner-info.component.html"
})
export class OwnerInfoComponent implements OnInit {
    form: FormGroup;
    user_id: string;
    category_list: any = [];
    base_url: string = Globals.img_base_url;
    processing = false;
    secureStorage: SecureStorage;
    create_app_data: any;

    owner_details: any = {
        owner_name: '',
        owner_designation: '',
        owner_pic: '',
        business_est_year: '',
        store_address: '',
        lat: '',
        long: ''
    }

    options = {
        context: {},
        fullscreen: false,
        viewContainerRef: this.vcRef
    };

    selectedIndex: number = null;
    hint = "Select Designation";
    designations: ValueList<string>;

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

    owner_pic: string = '';
    public selectedIndex_d = 1;
    public items: Array<string>;
    constructor(
        private exploreService: ExploreService,
        private createdAppService: CreatedAppService,
        private modal: ModalDialogService,
        private formBuilder: FormBuilder,
        private router: RouterExtensions,
        private vcRef: ViewContainerRef,
    ) {
        this.secureStorage = new SecureStorage();

    }

    ngOnInit() {
        this.user_id = getString('user_id');
        this.form = this.formBuilder.group({
            owner_name: ['', Validators.required],
            owner_designation: [''],
            business_est_year: [''],
            store_address: [''],
            lat: [''],
            long: ['']
        });

        this.loader.show(this.lodaing_options);
        this.getDesignationDropdown();
        this.populateData();

    }

    pickImage() {
        this.modal.showModal(UploadSingleImageModalComponent, this.options).then(res => {
            
            if (res != undefined) {
                if (res.camera == true) {
                    
                    var _pic = 'data:image/png;base64,' + res.image;
                    this.owner_pic = _pic
                }
                else if (res.gallery == true) {
                    
                    var _pic = 'data:image/png;base64,' + res.image
                    this.owner_pic = _pic
                }
            }
        })
    }

    onchange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}. New value is "${this.designations.getValue(
            args.newIndex)}"`);
        this.owner_details.owner_designation = this.designations.getValue(
            args.newIndex);
    }

    getDesignationDropdown() {

        this.createdAppService.getDesignationDropdown().subscribe(
            (data: any[]) => {
               
                this.designations = new ValueList<string>();
                for (let i = 0; i < data.length; i++) {
                    this.designations.push({
                        value: data[i]['id'],
                        display: data[i]['designation_name'],
                    });
                }
                this.items = [];
                for (var i = 0; i < 5; i++) {
                    this.items.push("data item " + i);
                }
                this.loader.hide();
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        );
    };

    populateData() {
        this.secureStorage.get({
            key: "create_app_data"
        }).then(
            value => {
                var data = JSON.parse(value);
                
                if (data != null) {
                    this.create_app_data = data;
                }
                else {

                }
            }
        );
    }
    submitOwnerInfo() {
        if (this.form.valid) {

            var data = {
                app_category: this.create_app_data.app_category,
                business_name: this.create_app_data.business_name,
                business_description: this.create_app_data.business_description,
                app_website_url: this.create_app_data.app_website_url,
                is_product_service: this.create_app_data.is_product_service,
                logo: this.create_app_data.logo,
                store_address: this.owner_details.store_address,
                lat: this.owner_details.lat,
                long: this.owner_details.long,
                owner_name: this.owner_details.owner_name,
                owner_designation: this.owner_details.owner_designation,
                business_est_year: this.owner_details.business_est_year,
                owner_pic: this.owner_pic,
                user: this.user_id
            }
           
            this.loader.show(this.lodaing_options);
            this.createdAppService.createNewApp(data).subscribe(
                res => {
                   
                    var d = {};
                    this.setCreateAppData(d)
                    this.loader.hide()
                    this.router.navigate(['/created-app/' + res['id'] + '/edit-business-images/' + 'new'])
                },
                error => {
                    console.log(error)
                    this.loader.hide()
                }
            )

        }
        else {
            this.markFormGroupTouched(this.form)
        }
    }

    setCreateAppData(data) {
        this.secureStorage.set({
            key: 'create_app_data',
            value: JSON.stringify(data)
        }).then(success => {
            
        });
    };

    searchLocation() {
        var option = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(LocationModalComponent, option).then(res => {
           
            if (res.name != "") {
                this.owner_details.store_address = res.name;
                this.owner_details.lat = res.latitude;
                this.owner_details.long = res.longitude
                // data.structured_formatting.main_text
            }
        })
    }

    markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }

    isFieldValid(field: string) {
        return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
    }

    displayFieldCss(field: string) {
        return {
            'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
            'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
        };
    }

}