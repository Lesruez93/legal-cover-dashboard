import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NotificationService} from '../notification.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SwalService} from '../swal.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {Subscription} from 'rxjs';
import algoliasearch from 'algoliasearch/lite';
declare const $: any;
declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: any;
}
const searchClient = algoliasearch(
    'B1G2GM9NG0',
    'aadef574be1f9252bb48d4ea09b5cfe5'
);
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit,AfterViewInit,OnDestroy {
  public uid: string;
  public subs: any;
    public dataTable: DataTable;
    notPaid: boolean = false;
    private sub: Subscription;
    users: any = [];
    private isChecked: boolean;

  constructor(public afs:AngularFirestore,
              public toast:NotificationService,
              public spinner:NgxSpinnerService,
              public s:SwalService,
              public router:Router,
              public a:AuthService,
              public storage:AngularFireStorage,
              public afAuth:AngularFireAuth)
  {




  }
  ngOnInit() {



      this.afAuth.authState.subscribe((res=> {


                      this.sub = this.afs.collection('users',)
                          .valueChanges({idField: 'docid'}).subscribe((resp: any) => {
                              this.users =  resp
                              this.dataTable = {
                                  headerRow: ['Full name', 'ID Number', 'Actions'],
                                  footerRow: [ 'Full name', 'Submission date', 'Actions'],

                                  dataRows: this.users
                              };



          })


      }))
  }

    nav(sub: any) {
        this.a.data = sub;
        this.router.navigate(['/submission'])
    }






      ngAfterViewInit() {
    $('#datatables').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records",
        }

    });

    const table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function(e) {
        const $tr = $(this).closest('tr');
        const data = table.row($tr).data();
        alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        e.preventDefault();
    });

    // Delete a record
    table.on('click', '.remove', function(e) {
        const $tr = $(this).closest('tr');
        table.row($tr).remove().draw();
        e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function(e) {
        alert('You clicked on Like button');
        e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
}

    disable(row: any) {
        this.afs.collection('users').doc(row.uid).update({
            status:'disabled'
        }).then(r=>{
            this.isChecked = true
           // this.s.alert('Plumber Disabled','success')
        })
    }


    enable(row: any) {
        this.afs.collection('users').doc(row.uid).update({
            status:'active'
        }).then(r=>{
            this.isChecked = false

        })
    }

    view(uid) {
        this.router.navigate(['profile/'+uid])
    }

    changed(event:any,row) {
        if (!event.checked){
            this.disable(row)

        }else {this.enable(row)
        }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
        const table = $('#datatables').DataTable();
        table.destroy()
    }

    delete(row: any) {
        this.afs.collection('users').doc(row.uid).delete().then(
            r=>{
                this.s.show('Deleted','success').then()
            }
        )
  }

    msg(uid: any) {
        this.router.navigate(['/inbox/'+uid])
    }
}
