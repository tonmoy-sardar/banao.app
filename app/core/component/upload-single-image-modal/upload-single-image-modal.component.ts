import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import * as imagepicker from "nativescript-imagepicker";
import { ImageCropper } from 'nativescript-imagecropper';
import * as camera from "nativescript-camera";
import * as permissions from "nativescript-permissions";
import * as imageSource from 'tns-core-modules/image-source';
declare var android: any;

@Component({
    selector: "upload-single-image-modal",
    moduleId: module.id,
    templateUrl: "upload-single-image-modal.component.html",
})

export class UploadSingleImageModalComponent implements OnInit {
    processing = false;
    imageCropper: ImageCropper;
    imageSource: imageSource.ImageSource;
    imageUrl: any;
    constructor(
        private params: ModalDialogParams,
    ) {
    }

    ngOnInit() {
        this.imageCropper = new ImageCropper();
        this.imageUrl = null;

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
                                this.imageCropper.show(source).then((args) => {
                                    if (args.image !== null) {
                                        this.imageUrl = args.image;
                                        const base64image = args.image.toBase64String("png", 60);
                                        this.params.closeCallback({ camera: true, image: base64image });
                                    }
                                })
                                    .catch((e) => {
                                        console.log(e);
                                    });
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

    onSelectSingleTap() {
        let context = imagepicker.create({
            mode: "single"
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
                    selected.getImageAsync((source) => {
                        const selectedImgSource = imageSource.fromNativeSource(source);
                        this.imageCropper
                            .show(selectedImgSource)
                            .then((args) => {
                                if (args.image !== null) {
                                    this.imageUrl = args.image;
                                    const base64image = args.image.toBase64String("png", 60);
                                    this.params.closeCallback({ gallery: true, image: base64image });
                                }
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    });
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

}