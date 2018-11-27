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
export class CreatedAppService {

  constructor(private http: HttpClient) { }


  getCreatedAppDetails(id) {
    return this.http.get(Globals.apiEndpoint + 'app_all_details/' + id + '/')
  }

  getCategoryList(): Observable<any> {
    return this.http.get(Globals.apiEndpoint + 'all_categories/')
  }

  updateAppInfo(app_id, data): Observable<any> {
    return this.http.put(Globals.apiEndpoint + 'edit_applogo_&_appname/' + app_id + '/', data)
  }

  getProductCategoryDetails(id) {
    return this.http.get(Globals.apiEndpoint + 'edit_app_products_category/' + id + '/')
  }

  updateProductCategory(id, data) {
    return this.http.put(Globals.apiEndpoint + 'edit_app_products_category/' + id + '/', data)
  }

  createProductCategory(data) {
    return this.http.post(Globals.apiEndpoint + 'create_app_products_category/', data)
  }

  deleteProductCategory(id, data) {
    return this.http.put(Globals.apiEndpoint + 'delete_app_products_category/' + id + '/', data)
  }

  getProductDetails(id) {
    return this.http.get(Globals.apiEndpoint + 'edit_app_products/' + id + '/')
  }

  updateProduct(id, data) {
    return this.http.put(Globals.apiEndpoint + 'edit_app_products/' + id + '/', data)
  }

  createProduct(data) {
    return this.http.post(Globals.apiEndpoint + 'create_app_products/', data)
  }

  deleteProduct(id, data) {
    return this.http.put(Globals.apiEndpoint + 'delete_app_products/' + id + '/', data)
  }

  getDesignationDropdown() {
    return this.http.get(Globals.apiEndpoint + 'dropdown_designations/')
  }

  getOwnerInfo(id) {
    return this.http.get(Globals.apiEndpoint + 'edit_owner_info/' + id + '/')
  }

  editOwnerInfo(data) {
    return this.http.put(Globals.apiEndpoint + 'edit_owner_info/' + data.id + '/', data)
  }

  getAppOrderList(id, params) {
    return this.http.get(Globals.apiEndpoint + 'all_order_by_app_id/' + id + '/' + params)
  }

  getAppOrderDetails(id) {
    return this.http.get(Globals.apiEndpoint + 'order_details/' + id + '/')
  }


  editOwnerLogo(data) {
    return this.http.put(Globals.apiEndpoint + 'edit_ownerlogo/' + data.id + '/', data)
  }


  editAppLogo(data) {
    return this.http.put(Globals.apiEndpoint + 'edit_applogo/' + data.id + '/', data)
  }

  updateBusinessImages(data) {
    return this.http.post(Globals.apiEndpoint + 'delete_create_business_images/', data)
  }

  updateCustomerOrderPayment(data) {
    return this.http.put(Globals.apiEndpoint + 'order-payment-status_activity/' + data.id + '/', data)
  }

  updateCustomerOrderDelivery(data) {
    return this.http.put(Globals.apiEndpoint + 'order_delivery/' + data.id + '/', data)
  }

  getSocialMediaType() {
    return this.http.get(Globals.apiEndpoint + 'social_media_type_dropdown/')
  }

  getAppSocialMedia(id) {
    return this.http.get(Globals.apiEndpoint + 'app_social_media/' + id + '/')
  }

  updateAppSocialMedia(data) {
    return this.http.post(Globals.apiEndpoint + 'bulk-add_app-social-media/', data)
  }

  createNewApp(data) {
    return this.http.post(Globals.apiEndpoint + 'add_new-app/', data)
  }

  getPriceList() {
    return this.http.get(Globals.apiEndpoint + 'dropdown_price_master/')
  }

  getSubscriptionTypeList() {
    return this.http.get(Globals.apiEndpoint + 'dropdown_subscriptions_type/')
  }

  getOfferList() {
    return this.http.get(Globals.apiEndpoint + 'dropdown_offer_code/')
  }

  paytmFormValue(app_id, order_amount, customer_email): Observable<any> {
    return this.http.get(Globals.apiEndpoint + 'get_payment_details/?app_id=' + app_id + '&order_amount=' + order_amount + '&type=app' + '&customer_email=' + customer_email)
  }

  appSubscription(data) {
    return this.http.post(Globals.apiEndpoint + 'app_subscription/', data)
  }

  customerOrderSeen(id) {
    return this.http.put(Globals.apiEndpoint + 'order_seen_activity/' + id + '/', {})
  }

  getOrderSeenActivity(id) {
    return this.http.get(Globals.apiEndpoint + 'order_seen_activity_count/' + id + '/')
  }

  updateAppSubscription(id, data) {
    return this.http.put(Globals.apiEndpoint + 'app_subscription/' + id + '/', data)
  }


  getAppBusinessImages(id) {
    return this.http.get(Globals.apiEndpoint + 'app_business_images/' + id + '/')
  }

  getSubscriptionDetails(id) {
    return this.http.get(Globals.apiEndpoint + 'subscribe_app_details/' + id + '/')
  }

  checkReferralCode(data) {
    return this.http.post(Globals.apiEndpoint + 'check_referral_code/', data)
  }


}


export class RadioOption {
  text: string;
  id: number;
  selected: boolean = false;

  constructor(text: string, id: number) {
    this.text = text;
    this.id = id;
  }
}
