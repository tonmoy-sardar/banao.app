import { Injectable,EventEmitter, Output } from "@angular/core";
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
export class FranchiseUserService {

  constructor(private http: HttpClient) { }

  getFranchiseUserList(id): Observable<any> {
    return this.http.get(Globals.apiEndpoint + 'app_user_list_by_frid/' + id + '/')
  }

}
