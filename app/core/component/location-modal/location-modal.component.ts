import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Observable } from 'tns-core-modules/data/observable';
import { GooglePlacesAutocomplete } from 'nativescript-google-places-autocomplete';
let API_KEY = "AIzaSyB3FKbaqonmY-bDPanbzJSH9U7HXF8dpS4";
let googlePlacesAutocomplete = new GooglePlacesAutocomplete(API_KEY);
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TextField } from "tns-core-modules/ui/text-field";
import { EventData } from "tns-core-modules/data/observable";
import * as geoLocation from "nativescript-geolocation";
@Component({
    selector: "location-modal",
    moduleId: module.id,
    templateUrl: "location-modal.component.html",
})

export class LocationModalComponent extends Observable {
    googlePlacesAutocomplete: GooglePlacesAutocomplete;
    searchInput = new Subject<string>();
    items;
    currentGeoLocation: any;
    constructor(
        private params: ModalDialogParams
    ) {
        super();
        this.searchInput.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(
            (params: any) => {
                googlePlacesAutocomplete.search(params)
                    .then((places: any) => {
                        this.items = [];
                        this.items = places;
                    }, (error => {
                        console.log(error)
                    }));
            }
            ,
            error => {
                console.log(error);
            }
        );
    }

    enableLocationServices(): void {
        geoLocation.isEnabled().then(enabled => {
            if (!enabled) {
                geoLocation.enableLocationRequest().then(() => this.showLocation());
            } else {
                this.showLocation();
            }
        });
    }

    showLocation(): void {
        geoLocation.watchLocation(location => {
            this.currentGeoLocation = location;
            this.params.closeCallback(location);
            // alert(this.currentGeoLocation)
        }, error => {
            alert(error);
        }, {
                desiredAccuracy: 3,
                updateDistance: 10,
                minimumUpdateTime: 1000 * 1
            });
    }

    getPlace(place) {
        googlePlacesAutocomplete.getPlaceById(place.placeId).then((place) => {
            // dialogs.alert("Frmatted address :" + place.formattedAddress + "\n latitude: " + place.latitude + "\n longitude: " + place.longitude)
            //     .then(function () { });
            this.params.closeCallback(place);
        }, error => {
            console.log(error)
        })
    }

    searchFieldChanged(args: EventData) {
        var tmptextfield = <TextField>args.object
        this.searchInput
            .next(tmptextfield.text)
    }

    listViewItemTap(args) {
        this.getPlace(this.items[args.index]);
    }


    close() {
        this.params.closeCallback({ "close": true });
    }

}