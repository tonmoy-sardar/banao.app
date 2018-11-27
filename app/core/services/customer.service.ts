import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
    HttpParams,
} from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as Globals from '../../core/globals';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomerListByApp(id): Observable<any> {
        return this.http.get(Globals.apiEndpoint + 'customer_list_by_app_id/' + id + '/')
    }

}
