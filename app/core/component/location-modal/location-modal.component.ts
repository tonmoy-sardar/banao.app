import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Observable } from 'tns-core-modules/data/observable';
import { GooglePlacesAutocomplete } from 'nativescript-google-places-autocomplete';

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TextField } from "tns-core-modules/ui/text-field";
import { EventData } from "tns-core-modules/data/observable";
import * as geoLocation from "nativescript-geolocation";
import * as Globals from '../../globals';
let API_KEY = Globals.google_api_key
let googlePlacesAutocomplete = new GooglePlacesAutocomplete(API_KEY);
import { ExploreService } from "../../services/explore.service";

@Component({
    selector: "location-modal",
    moduleId: module.id,
    templateUrl: "location-modal.component.html",
    styleUrls: ["location-modal.component.css"]
})

export class LocationModalComponent extends Observable {
    googlePlacesAutocomplete: GooglePlacesAutocomplete;
    searchInput = new Subject<string>();
    items;
    currentGeoLocation: any;
    constructor(
        private params: ModalDialogParams,
        private exploreService: ExploreService,
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
                        // console.log(this.items)
                    }, (error => {
                        // console.log(error)
                    }));
            }
            ,
            error => {
                // console.log(error);
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
            this.exploreService.getAdressFromLatLong(location['latitude'], location['longitude']).subscribe(
                res => {
                    this.params.closeCallback(res['results'][0]);
                },
                error => {
                    console.log(error)
                }
            )
            
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
            this.exploreService.getAdressFromLatLong(place['latitude'], place['longitude']).subscribe(
                res => {
                    this.params.closeCallback(res['results'][0]);
                },
                error => {
                    console.log(error)
                }
            )            
        }, error => {
            // console.log(error)
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