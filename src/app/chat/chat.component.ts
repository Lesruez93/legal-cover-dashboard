// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {SwalService} from '../swal.service';
import Swal from 'sweetalert2';
import {NotificationService} from '../notification.service';



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
    numbers: any = {

    };
    news: any = 6;

    constructor(private db: AngularFirestore,
                private swal:SwalService,
                private not:NotificationService,
                private afs: AngularFireAuth) {




    }


    public ngOnInit() {
        this.db.collection("users").valueChanges().subscribe(values => {

            this.users = values.length

        })



        this.db.collection("calls").doc('numbers').valueChanges().subscribe(values => {

            this.numbers = values

        })
    }


    async notify() {
        // @ts-ignore
        const {value: text} = await Swal.fire({
            input: 'textarea',
            title: 'Send notification',
            inputPlaceholder: 'Type your message here...',

            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter a message!'
                }
            },
            showCancelButton: true
        })

        if (text) {
            this.db.collection('notifications').add({
                admin: true,
                msg: text,
                date: Date.now(),
                name: 'Legal cover',

            }).then(r => {
                this.postNot(text)
                // @ts-ignore
                //Swal.fire(")
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Notification sent to the users',
                    showConfirmButton: false,
                    confirmButtonClass: 'btn btn-info',

                    timer: 1500
                })
            }).catch(e => {

            })

        }
    }



    update() {
        this.db.collection("calls").doc('numbers').update(this.numbers).then(values => {

           this.swal.show('Updated','success')

        })
    }


    postNot(msg){
        let postData = {

            "app_id": "1a3b10ba-afb8-46c4-9ee2-3dbe68fdf926",
            "data": {msg: msg},
            "contents": {"en": msg},
            "heading":{"en": "New Notification"},
            "included_segments": ["Subscribed Users"],


        }

        this.not.post(postData).subscribe(re => {

        }, error1 => {
        })
    }
}
