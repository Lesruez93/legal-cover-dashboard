import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NotificationService} from '../notification.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SwalService} from '../swal.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Subject, Subscription} from 'rxjs';
import {DataTableDirective} from 'angular-datatables/src/angular-datatables.directive';
import {HttpClient, HttpHeaders} from '@angular/common/http';
declare const $: any;




@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    public uid: string;
    public subs: any;
    notPaid: boolean = false;
    users: any = [];
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    private sub: Subscription;
    private isChecked: boolean;

    constructor(public afs: AngularFirestore,
                public toast: NotificationService,
                public spinner: NgxSpinnerService,
                public s: SwalService,
                public router: Router,
                public a: AuthService,
                public storage: AngularFireStorage,
                public afAuth: AngularFireAuth) {


    }

    ngOnInit() {


        this.afAuth.authState.subscribe((res => {


            this.sub = this.afs.collection('users',)
                .valueChanges({idField: 'docid'}).subscribe((resp: any) => {
                    this.users = resp
                    this.dtTrigger.next();



                })


        }))
    }

    nav(sub: any) {
        this.a.data = sub;
        this.router.navigate(['/submission'])
    }


    ngAfterViewInit() {
        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
                [10, 25, 50, -1],
                [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }

        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function (e) {
            const $tr = $(this).closest('tr');
            const data = table.row($tr).data();
            alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
            e.preventDefault();
        });

        // Delete a record
        table.on('click', '.remove', function (e) {
            const $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        });

        //Like record
        table.on('click', '.like', function (e) {
            alert('You clicked on Like button');
            e.preventDefault();
        });

        $('.card .material-datatables label').addClass('form-group');
    }

    disable(row: any) {
        this.afs.collection('users').doc(row.uid).update({
            status: 'disabled'
        }).then(r => {
            this.isChecked = true
            // this.s.alert('Plumber Disabled','success')
        })
    }


    enable(row: any) {
        this.afs.collection('users').doc(row.uid).update({
            status: 'active'
        }).then(r => {
            this.isChecked = false

        })
    }

    view(uid) {
        this.router.navigate(['profile/' + uid])
    }

    changed(event: any, row) {
        if (!event.checked) {
            this.disable(row)

        } else {
            this.enable(row)
        }
    }



    delete(row: any) {
        this.afs.collection('users').doc(row.uid).delete().then(
            r => {
                this.s.show('Deleted', 'success').then()
            }
        )
    }

    msg(uid: any) {
        this.router.navigate(['/inbox/' + uid])
    }


    async notify(row: any) {
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
            this.afs.collection('notifications').add({
                uid: row.uid,
                msg: text,
                date: Date.now(),
                name: 'Legal cover',

            }).then(r => {
                this.postNot(row.sig_id,text)

                // @ts-ignore
                //Swal.fire(")
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'notification sent to the user ' + row.first_name,
                    showConfirmButton: false,
                    confirmButtonClass: 'btn btn-info',

                    timer: 1500
                })
            }).catch(e => {

            })

        }
    }


    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.sub.unsubscribe()

        this.dtTrigger.unsubscribe();
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: any) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }



    postNot(uid,msg){
        let postData = {

            "app_id": "1a3b10ba-afb8-46c4-9ee2-3dbe68fdf926",
            "data": {uid: msg},
            "contents": {"en": msg},
            "heading":{"en": "New Notification"},
            "include_player_ids":[uid],
        }



            this.toast.post(postData).subscribe(re => {

            }, error1 => {
            })
        }}


