import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFireAuth} from '@angular/fire/auth';


declare var $: any;


@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    password;
    username;
    error;
    private redirectURL: any;
    private redirectURL2: string;
    hide: boolean = true;

    constructor(private element: ElementRef, private router: Router,
                private afAuth:AngularFireAuth,
                public route:ActivatedRoute,
                private afs:AngularFirestore,
                private spinner: NgxSpinnerService,
                private db: AngularFirestore) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;


    }

    ngOnInit() {

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }
    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        const sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }

    onlogin() {

let params = this.route.snapshot.queryParams;
        if (params['redirectURL']) {
            this.redirectURL2 = params['redirectURL'];
        }
        this.spinner.show();


        this.afAuth.signInWithEmailAndPassword(this.username,this.password).then(res=>{
            console.log(res.user.uid)

            let params = this.route.snapshot.queryParams;
            if (params['redirectURL']) {
                this.redirectURL = params['redirectURL'];
            }


            if (this.redirectURL) {
                this.router.navigateByUrl(this.redirectURL,)
                    .catch(() => this.router.navigate(['/']))
            } else {

                this.router.navigate(['/'])
            }

        }).catch(error=>{
            console.log(error)
            this.error = 'Incorrect username and password';
            this.spinner.hide()


        })


    }


    register() {
        // let params = this.route.snapshot.queryParams;
        // if (params['redirectURL']) {
        //     this.redirectURL2 = params['redirectURL'];
        // }
        this.router.navigateByUrl('/register')//+'?redirectURL='+this.redirectURL2);

    }


    hid() {
            console.log(this.hide)
        this.hide = !this.hide
    }
}


