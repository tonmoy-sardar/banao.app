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
export class ExploreService {

  @Output() getHomePageStatus: EventEmitter<any> = new EventEmitter();

  homePageStatus(data) {
    if (data == true) {
      this.getHomePageStatus.emit(true);
      return
    } else {
      this.getHomePageStatus.emit(false);
      return
    }
  }
  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<any> {
    return this.http.get(Globals.apiEndpoint + 'all_categories/')
  }

  getAppAndUserDetailsByUserID(id): Observable<any> {
    return this.http.get(Globals.apiEndpoint + 'app_and_user_details/' + id + '/')
  }

}
