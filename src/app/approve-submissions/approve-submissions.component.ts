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
import Swal from 'sweetalert2'
import {Subscription} from 'rxjs';
declare const $: any;
declare interface DataTable {
    headerRow: [ 'Serial number', 'Plumber', ' ID number' ,'Address',  'Submission date', 'Actions' ],
    footerRow: string[];
    dataRows: any;
}
@Component({
  selector: 'app-approve-submissions',
  templateUrl: './approve-submissions.component.html',
  styleUrls: ['./approve-submissions.component.scss']
})
export class ApproveSubmissionsComponent implements OnInit, AfterViewInit  , OnDestroy  {
  public uid: string;
  public subs: any [];
    public dataTable: DataTable;
    private geysers: any;
    private amount: any = 520;
    notPaid: boolean = false;
    private sub: Subscription;
    private user: any;
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


      this.afAuth.authState.subscribe((res=>{
          if (res&&res.uid) {
              this.uid = res.uid;
              this.sub = this.afs.collection('users').doc(res.uid).valueChanges({idField: 'docid'}).subscribe((resp: any) => {
this.user= resp
                  if (!resp.paid) {
                      this.notPaid = true;
                      this.sub.unsubscribe();
                      this.s.pay(this.amount).then((result: any) => {

                          this.spinner.show();
                          if (result.value) {
                              window.open(`https://sandbox.payfast.co.za/eng/process?amount=${this.amount}&merchant_key=46f0cd694581a&merchant_id=10000100&item_name=test&paraphrase=WACCsa123456&return_url=https://qr.waccsa.co.za/paid/${this.uid}&cancel_url=https://qr.waccsa.co.za/paid/cancel.php&notify_url=https://qr.waccsa.co.za`
                                  , '_self')

                          } else {

                              this.router.navigate(['../'])
                          }

                      })

                      // window.open(`https://payfast.co.za/eng/process?amount=${this.amount}&merchant_key=lmmjxf2hwvivr&merchant_id=18104000&item_name=test&paraphrase=WACCsa123456&return_url=https://qr.waccsa.co.za/paid/${this.uid}&cancel_url=https://qr.waccsa.co.za/paid/cancel.php&notify_url=https://qr.waccsa.co.za`
                      // , '_self')
                      // })
                  } else {
                      this.afs.collection('submissions', ref =>
                          ref.where('status','==','pending')
                              .where('parent','==',resp.uid).orderBy('sub_date','desc')).valueChanges({idField: "docid"})
                          .subscribe((res => {
                              this.subs = res;
                              this.dataTable = {
                                  headerRow: [ 'Serial number', 'Plumber', ' ID number' ,'Address',  'Submission date', 'Actions' ],
                                  footerRow: [  'Serial number', 'Manufacture date',  'Submission date', 'Actions' ],

                                  dataRows: this.subs
                              };
                              console.log(res)
                          }))
                  }
              })



  }}))}


   async disapprove(row: any) {
        // @ts-ignore
       const { value: text } = await Swal.fire({
            input: 'textarea',
            title: 'Disapprove',
            inputPlaceholder: 'Type your message here...',

            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter a message!'
                }
            },
            showCancelButton: true
        })

        if (text) {
            this.afs.collection('msgs').doc(row.uid).collection('chat').add({
                uid:this.uid,
                msg:text,
                id:Date.now(),
                dp:this.user.photo || null,
                name:this.user.first_name,

            }).then(r=>{
                // @ts-ignore
                //Swal.fire(")
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Disapproved and message sent to the user",
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(e=>{

            })

        }
    }


    async approve(row){

        // @ts-ignore
        Swal.fire({
            title: 'Do you want to approve?',

            showCancelButton: true,
            confirmButtonText: `Approve`,

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            console.log(result)
            if (result.value) {
                this.afs.collection('submissions').doc(row.docid).update({
                    status:'approved'
                }).then(r=>{
                   this.s.alert('Approved','success')
                }).catch(e=>{
                    this.s.alert('Failed please try again','error')
                })

            }

        })
    }

    view(row: any) {
        this.a.data = row;
        this.router.navigate(['/view-heat-pump'])
    }


    nav(sub: any) {
        this.a.data = sub;

        this.router.navigate([sub.type])
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

        table.on('click', '.view', e=> {
            this.nav(JSON.parse(e.target.dataset.user))

            e.preventDefault();
        });

        // Delete a record
        table.on('click', '.circle', e => {
            console.log( JSON.parse(e.target.dataset.user))
            this.nav(JSON.parse(e.target.dataset.user))


            e.preventDefault();
        });


        table.on('click', '.approve', e => {
            console.log( JSON.parse(e.target.dataset.user))
            this.approve(JSON.parse(e.target.dataset.user))


            e.preventDefault();
        });



        table.on('click', '.dis', e => {
            console.log( JSON.parse(e.target.dataset.user))
            this.disapprove(JSON.parse(e.target.dataset.user))


            e.preventDefault();
        });

        //Like record


        $('.card .material-datatables label').addClass('form-group');
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
        const table = $('#datatables').DataTable();
        table.destroy()
    }

    color(type) {

        switch (type){

            case '/view-heat-pump':return'#53AC57';

            case '/view-solar':return'#E94643'

            case '/view-solarr':return'#FD9B19';

            case '/view-prisma':return'#A844BA'

            case '/view-electric':return'#1CBED2';




        }


    }
    stringify(row: any) {
        return JSON.stringify(row)
    }
}
