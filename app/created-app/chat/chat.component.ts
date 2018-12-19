import { Component, OnInit, OnDestroy, NgZone, Inject, ViewChild, ElementRef } from "@angular/core";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { CreatedAppService } from "../../core/services/created-app.service";
import { MessageService } from '../../core/services/message.service';
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
require("nativescript-websockets");
import { LoadingIndicator } from "nativescript-loading-indicator";
import { NotificationService } from "../../core/services/notification.service";
import { ExploreService } from "../../core/services/explore.service";
import {
    CFAlertDialog,
    DialogOptions,
    CFAlertGravity,
    CFAlertActionAlignment,
    CFAlertActionStyle,
    CFAlertStyle,
  } from 'nativescript-cfalert-dialog';
  import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: 'chat',
    moduleId: module.id,
    templateUrl: `chat.component.html`
})
export class ChatComponent implements OnInit, OnDestroy {
    app_id: string;
    visible_key: boolean;
    message: string;
    socket: any;
    messages: Array<any>;
    user_id: string;
    @ViewChild("ScrollList") scrollList: ElementRef;

    loader = new LoadingIndicator();
    lodaing_options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
            indeterminate: true,
            cancelable: false,
            cancelListener: function (dialog) { console.log("Loading cancelled") },
            max: 100,
            progressNumberFormat: "%1d/%2d",
            progressPercentFormat: 0.53,
            progressStyle: 1,
            secondaryProgress: 1
        },
        ios: {
            details: "Additional detail note!",
            margin: 10,
            dimBackground: true,
            color: "#4B9ED6",
            backgroundColor: "yellow",
            userInteractionEnabled: false,
            hideBezel: true,
        }
    }
    private cfalertDialog: CFAlertDialog;
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private messageService: MessageService,
        private router: RouterExtensions,
        private zone: NgZone,
        private CreatedAppService: CreatedAppService,
        private notificationService: NotificationService,
        private exploreService: ExploreService,
        private page: Page
    ) {
        exploreService.homePageStatus(false);
        this.messages = [];
        this.message = "";
        this.cfalertDialog = new CFAlertDialog();
    }
    customer_device_token: string;
    ngOnInit() {
        this.page.on("loaded", (args) => {
            if (this.page.android) {
              this.page.android.setFitsSystemWindows(true);
            }
          });
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = this.route.snapshot.params["user"];
        this.getCustomerDeviceToken(this.user_id);
        this.createChatSession();
        this.socket = new WebSocket("ws://132.148.147.239:8001/messages/?sender=" + this.app_id + "&sender_type=app_master&receiver=" + this.user_id + "&receiver_type=customer");
        this.socket.onopen = (evt) => this.onOpen(evt)
        this.socket.onclose = (evt) => this.onClose(evt)
        this.socket.onmessage = (evt) => this.onMessage(evt)
        this.socket.onerror = (evt) => this.onError(evt)
    }

    getCustomerDeviceToken(id) {
        this.notificationService.getCustomerDeviceToken(id).subscribe(
            res => {

                this.customer_device_token = res['customer_device_token']
            },
            error => {
                console.log(error)
            }
        )
    }

    pushNotf(message: string) {
        var value = {
            title: "BanaoApp(new message)",
            subtitle: "New message",
            text: message
        }
        this.notificationService.sendPushNotification(this.customer_device_token, value).subscribe(
            res => {

            },
            error => {
                console.log(error)
            }
        )
    }

    onOpen(evt) {

        console.log("Welcome to the chat!");
    }

    onClose(evt) {
        this.socket.onopen = (evt) => this.onOpen(evt)
        console.log("You have been disconnected");
    }

    onMessage(evt) {

        var msgData = JSON.parse(evt.data)
        this.zone.run(() => {
            var data = {
                text: msgData.message,
                created: new Date(),
                // read_status: true
            }
            if (msgData.chat_user == this.app_id) {
                data['sender'] = true
            }
            else {
                data['sender'] = false
            }
            this.messages.push(data);
            this.scrollToBottom();
        });
    }

    onError(evt) {
        console.log("The socket had an error");
    }

    ngOnDestroy() {
        // this.socket.close();
    }



    isViewed(message) {
        if (message.read_status) {
            return true
        }
        else {
            return false
        }
    }

    send() {
        if (this.message) {
            var data = {
                chat_user: this.app_id,
                chat_user_type: "app_master",
                message: this.message
            }
            this.socket.send(JSON.stringify(data));
            this.pushNotf(this.message);
            this.message = "";
        }
    }


    createChatSession() {
        var data = {
            chat_user: '',
            message: '',
            chat_user_type: ''
        }
        var param = "?sender=" + this.app_id + "&sender_type=app_master&receiver=" + this.user_id + "&receiver_type=customer"
        this.loader.show(this.lodaing_options);
        this.messageService.createChatSessionView(param, data).subscribe(
            res => {

                var thread = res['thread']
                this.viewMessages(thread)
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }

    viewMessages(thread) {
        var param = "?user=" + this.user_id + "&user_type=customer&thread_id=" + thread;
        this.messageService.viewMessages(param).subscribe(
            res => {

                this.getMessageList(thread);
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }


    getMessageList(thread) {
        this.messageService.getMessageListByCustomer(thread).subscribe(
            (res: any[]) => {

                res.forEach(x => {
                    var data = {
                        text: x.message,
                        created: x.datetime,
                        read_status: x.read_status
                    }
                    if (x.chat_user == this.app_id) {
                        data['sender'] = true
                    }
                    else {
                        data['sender'] = false
                    }
                    this.messages.push(data)
                })

                this.scrollToBottom();
                this.loader.hide();
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }


    scrollToBottom() {
        setTimeout(() => {
            this.scrollList.nativeElement.scrollToVerticalOffset(100000);
        }, 1000);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onNavItemTap(navItemRoute: string): void {

        console.log(navItemRoute);
        this.router.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    onNavBtnTap() {
        // This code will be called only in Android.
        this.router.back();
    }
}