// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute, Route} from '@angular/router';



@Component({
    selector: 'app-inbox',
    templateUrl: 'inbox.component.html',
    styleUrls: ['inbox.component.scss']

})

export class InboxComponent implements OnInit {
    geysers: any;
    inbox: any;
    uid: any;
    user: any;
     msg: any;
     u: any;


    constructor(private afs:AngularFirestore,
                private auth:AngularFireAuth,
                private activatedRoute:ActivatedRoute,
    ){

    }

    ngOnInit() {

        this.u = this.activatedRoute.snapshot.paramMap.get('id')

        this.auth.authState.subscribe((res:any)=>{
            if (res.uid){
                this.uid =res.uid

                this.afs.collection('msgs').doc(this.u).collection('chat',
                    ref => ref.orderBy('id','asc')).
                valueChanges({idField:'docid'}).subscribe((res:any)=>{
                    this.inbox = res
                })
                this.afs.collection('users').doc(res.uid).valueChanges().subscribe((res:any)=>{
                    this.user = res
                })
            }
        })



    }


    send(){
        if (this.msg){
            let data = {
                uid:this.uid,
                dp:this.user.photo || null,
                name:this.user.first_name,
                id:Date.now(),
                msg:this.msg
            }
            this.afs.collection('msgs').doc(this.u).collection('chat') .add(data).then((res:any)=>{
                this.msg = null
            })
        }}

}
