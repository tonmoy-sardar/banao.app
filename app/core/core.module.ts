import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { DropDownModule } from "nativescript-drop-down/angular";
import { AccordionModule } from "nativescript-accordion/angular";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { TNSFrescoModule } from "nativescript-fresco/angular";
// directive
import { MinLengthDirective, MaxLengthDirective, IsEmailDirective } from "./directive/input.directive";
import { CarouselDirective } from "./directive/carousel.directive";
// guard
import { AuthGuard } from './guard/auth.guard';

// services
import { LoginService } from './services/login.service';
import { ExploreService } from './services/explore.service';
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { CreatedAppService } from './services/created-app.service';
import { MessageService } from './services/message.service';
import { CustomerService } from './services/customer.service';
import { NotificationService } from './services/notification.service';
// component
import { ActionBarComponent } from './component/action-bar/action-bar.component';
import { UploadSingleImageModalComponent } from './component/upload-single-image-modal/upload-single-image-modal.component';
import { UploadMultipleImageModalComponent } from './component/upload-multiple-image-modal/upload-multiple-image-modal.component';
import { LocationModalComponent } from './component/location-modal/location-modal.component';
import { AppActionBarComponent } from './component/app-action-bar/app-action-bar.component';
import { CreateAppActionBarComponent } from './component/create-app-action-bar/create-app-action-bar.component';
import { TermsDialogComponent } from './component/terms-dialog/terms-dialog.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        AccordionModule,
        NativeScriptHttpClientModule,
        DropDownModule,
        TNSCheckBoxModule,
        NativeScriptUIListViewModule,
        TNSFrescoModule,
    ],
    declarations: [
        MinLengthDirective,
        MaxLengthDirective,
        IsEmailDirective,
        ActionBarComponent,
        CarouselDirective,
        UploadSingleImageModalComponent,
        UploadMultipleImageModalComponent,
        LocationModalComponent,
        AppActionBarComponent,
        CreateAppActionBarComponent,
        TermsDialogComponent
    ],
    exports: [
        MinLengthDirective,
        MaxLengthDirective,
        IsEmailDirective,
        AccordionModule,
        TNSCheckBoxModule,
        ActionBarComponent,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        CarouselDirective,
        DropDownModule,
        AppActionBarComponent,
        CreateAppActionBarComponent,
        NativeScriptUIListViewModule,
        TNSFrescoModule,
    ],
    entryComponents: [
        UploadSingleImageModalComponent,
        UploadMultipleImageModalComponent,
        LocationModalComponent,
        TermsDialogComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthGuard,
                LoginService,
                ExploreService,
                ModalDialogService,
                CreatedAppService,
                MessageService,
                CustomerService,
                NotificationService
            ]
        };
    }
}