// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {SwalService} from '../swal.service';
import Swal from 'sweetalert2';



@Component({
    selector: 'app-chat',
    templateUrl: 'popia.component.html'

})

export class PopiaComponent implements OnInit {
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }



    public ngOnInit() {


    }


}
