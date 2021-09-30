// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';



@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.scss']

})

export class ChatComponent implements OnInit {
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }


    devotions;
    notices;
    series;
    org_id;
    subscribers: any;
    users: number;

    constructor(private db: AngularFirestore, private authservice: AngularFireAuth) {




    }


    public ngOnInit() {
        this.db.collection("users").valueChanges().subscribe(values => {

            this.users = values.length

        })

    }
}
