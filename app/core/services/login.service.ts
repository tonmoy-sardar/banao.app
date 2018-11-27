import { Injectable , EventEmitter, Output} from "@angular/core";
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
export class LoginService {

  @Output() getLoginStatus: EventEmitter<any> = new EventEmitter();

  loginStatus(status) {
    this.getLoginStatus.emit(status);
  }

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post(Globals.apiEndpoint + 'login/', data)
  }

  signup(data): Observable<any> {
    return this.http.post(Globals.apiEndpoint + 'add_user/', data)
  }

  userForgetPasswordOtp(data): Observable<any> {
    return this.http.post(Globals.apiEndpoint + 'user_forget_password_otp/', data)
  }
  
  userForgetPasswordUpdate(data): Observable<any> {
    return this.http.put(Globals.apiEndpoint + 'user_forget_password_update/', data)
  }
}
