import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import * as imagepicker from "nativescript-imagepicker";
import * as camera from "nativescript-camera";
import * as permissions from "nativescript-permissions";
import * as imageSource from 'tns-core-modules/image-source';
var platformModule = require("platform");
declare var android: any;
@Component({
    selector: "upload-multiple-image-modal",
    moduleId: module.id,
    templateUrl: "upload-multiple-image-modal.component.html",
})

export class UploadMultipleImageModalComponent implements OnInit {
    processing = false;
    imageSource: imageSource.ImageSource;
    imagesUrl: any = [];
    previewSize: number = 300
    constructor(
        private params: ModalDialogParams,
    ) {
    }

    ngOnInit() {
        this.imagesUrl = [];
    }

    cancel() {
        this.params.closeCallback({ "close": true });
    }

    onTakePictureTap(args) {
        if (camera.isAvailable()) {
            permissions.requestPermission([android.Manifest.permission.CAMERA, android.Manifest.permission.WRITE_EXTERNAL_STORAGE])
                .then(() => {
                    camera.takePicture({ width: 300, height: 300, keepAspectRatio: true })
                        .then((imageAsset) => {
                            let source = new imageSource.ImageSource();
                            source.fromAsset(imageAsset).then((source) => {
                                const base64image = source.toBase64String("png", 60);
                                this.imagesUrl.push({
                                    url: base64image
                                })
                                this.params.closeCallback({ camera: true, images: this.imagesUrl });
                            });
                        }).catch((err) => {
                            console.log("Error -> " + err.message);
                        });
                })
                .catch(() => {
                    // When user denies permission
                    console.log("User denied permissions");
                });
        }
    }

    onSelectMultipleTap() {
        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    startSelection(context) {
        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then((selection) => {
                selection.forEach((selected) => {
                    var localPath = null;
                    if (platformModule.device.os === "Android") {
                        localPath = selected.android;
                    } else {
                        localPath = selected.ios;
                    }
                    const base64image = localPath.toBase64String("png", 60);
                    this.imagesUrl.push({
                        url: base64image
                    })
                });                
                
                this.params.closeCallback({ gallery: true, images: this.imagesUrl });
            })
            .catch((e) => {
                console.log(e);
            });
    }

}