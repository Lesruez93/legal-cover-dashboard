import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../notification.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SwalService} from '../swal.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-resources',
    templateUrl: './res.component.html',
    styleUrls: ['./res.component.scss']
})
export class ResComponent implements OnInit {
    save_disabled: any;
    title: any;
    description: any = null;


    editing: any = false;
    adding: any;
    date: any;

  
    private docId: any;
 
  link: string;
  links: any[];

    constructor(private afs: AngularFirestore,
                private toast: NotificationService,
                private spinner: NgxSpinnerService,
                private s: SwalService,
    ) {

       
               
                afs.collection('links').valueChanges({idField: 'docid'})
                    .subscribe((res => {
                        this.links = res
                    }))
            }
      


    

    ngOnInit() {


    }

    save() {

        this.spinner.show();
        //+/
        // ++this.s.deleted()

      if (!this.link.startsWith('https://')){
        this.link = 'https://'+this.link
      }
        let d = {
            title: this.title,
            link: this.link,
            id: Date.now(),


        }
        this.afs.collection('links').add(d).then(res => {
            this.postNot(d)
            this.spinner.hide()
            this.title = ''
            this.link = ''


            this.toast.showNotification('Resource published', 'top', 'center', 'success', 'Success')
        }).catch(reason => {
            this.spinner.hide()
            this.toast.showNotification('Oops Something went wrong', 'top', 'center', 'danger', 'Failed')

        })
    }

    showEdit(resource: any) {
     
        document.getElementById('title').focus();
        this.editing = true
        this.docId = resource.docid
        this.title = resource.title
        this.link = resource.link
      
    }

    onDelete(id: any) {
        this.s.delete().then((result => {
            if (result.value) {
                this.afs.collection('links').doc(id).delete().then((res => {
                    this.s.deleted()

                }))


            } else {
                this.s.cancelled()
            }

        }))
    }

    update() {
      if (!this.link.startsWith('https://')){
        this.link = 'https://'+this.link
      }
        this.afs.collection('links').doc(this.docId).update({
            title: this.title,
            link: this.link,
          
            
        }).then(r=>{
          this.toast.showNotification('Resource updated', 'top', 'center', 'success', 'Success')
          this.editing = false
        })

    }


    postNot(msg) {
        let postData = {

            'app_id': '1a3b10ba-afb8-46c4-9ee2-3dbe68fdf926',
            'data': {msg: msg},
            "contents": {"en": msg},
            "heading": {"en": "Resource"},
            "included_segments": ["Subscribed Users"],


        }

        this.toast.post(postData).subscribe(re => {

        }, error1 => {
        })
    }


}
