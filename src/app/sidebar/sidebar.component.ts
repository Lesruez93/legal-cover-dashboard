import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from '../auth.service';
import { Router} from "@angular/router";
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{




        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },


];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    churchname;
    username;
    comp: any = '';
    user: string;
    type: any;
     uid: string;
    usr: any = '';
    data: any= {};
    constructor(private auth:AuthService,private router: Router,
                private afs:AngularFirestore,
                private afAuth:AngularFireAuth,
                ){

    }



    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };


    
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);


    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    logOut() {

        this.afAuth.signOut().then(()=>{
            window.open('/login','_self')

        })
    }
}
