import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../forms/validationforms/password-validator.component';
import {MyErrorStateMatcher} from '../../forms/validationforms/validationforms.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {NgxSpinnerService} from 'ngx-spinner';
import {NotificationService} from '../../notification.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {FileValidator} from 'ngx-material-file-input';
import {SwalService} from '../../swal.service';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    register: FormGroup;
    private uploadPercent: Observable<number | undefined>;
    private downloadURL: Observable<any>;
    private upload: Subscription;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    matcher = new MyErrorStateMatcher();

    validEmailRegister: boolean = false;
    validConfirmPasswordRegister: boolean = false;
    validPasswordRegister: boolean = false;
    private validTextType: boolean;
    type: FormGroup;
    readonly maxSize = 5485760;
    private t_c: any;
    private redirectURL: any;
    private params: any;
    user_types: any = ['Individual','Company'];
     user_type: string = "Plumber";
    hide: boolean = true;

    constructor(private formBuilder: FormBuilder,
                private afs:AngularFirestore,
                private notification:NotificationService,
                private spinner: NgxSpinnerService,
                private element: ElementRef,
                private swal:SwalService,
                private router:Router,
                private route:ActivatedRoute,
                public storage:AngularFireStorage,
                private afAuth:AngularFireAuth) {}

    ngOnInit() {

        this.params = this.route.snapshot.queryParams;
        console.log(this.params)

        this.register = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the first_name attribute must have a value in it.
            email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
           // optionsCheckboxes: ['', Validators.required],
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            //user_type: [null, Validators.required],
            phone_number: [null, Validators.required],
           // t_c: [null, Validators.required],
            t_c: [
                undefined,
                [Validators.required, FileValidator.maxContentSize(this.maxSize)]
            ],
            id_number: [null, Validators.required],
            password: ['',  Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmPassword: ['', Validators.required],
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        });
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('register-page');
      body.classList.add('off-canvas-sidebar');
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('register-page');
      body.classList.remove('off-canvas-sidebar');
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }

    emailValidationRegister(e){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailRegister = true;
        } else {
            this.validEmailRegister = false;
        }
    }
    passwordValidationRegister(e){
        if (e.length > 5) {
            this.validPasswordRegister = true;
        }else{
            this.validPasswordRegister = false;
        }
    }
    confirmPasswordValidationRegister(e){
        if (this.register.controls['password'].value === e) {
            this.validConfirmPasswordRegister = true;
        }else{
            this.validConfirmPasswordRegister = false;
        }
    }

    textValidationType(e){
        if (e) {
            this.validTextType = true;
        }else{
            this.validTextType = false;
        }
    }


    onRegister() {


            this.afAuth.createUserWithEmailAndPassword
            (this.register.get('email').value,this.register.get('password').value).then((res=>{
                let data = {
                    first_name:this.register.get('first_name').value,
                    last_name:this.register.get('last_name').value,
                    phone_number:this.register.get('phone_number').value,
                    id_number:this.register.get('id_number').value,
                    uid:res.user.uid,
                    type:this.user_type,
                    comp:this.user_type,
                    user_type:this.user_type,
                    paid:null,
                    email:this.register.get('email').value,
                    t_c:this.t_c

                };

                this.afs.collection('users').doc(res.user.uid).set(data).then((res=>{
                    this.spinner.hide()
                    this.swal.show("Registration Successful","success").then(r=>{
                       this.r()
                    })

                })).catch(error=>{
                    this.spinner.hide()
                    this.swal.show(error.message,"error").then()

                })
            })).catch(error=>{
                console.log(error)
                this.swal.show(error.message,"error").then()

                this.spinner.hide()

            });



    }

    uploadFile(event) {
        // take the filename from the file

        this.spinner.show()

        const file = event.files[0];
        const filePath =Date.now().toString()
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available

        this.upload =  task.snapshotChanges().pipe(
            finalize(() =>
                {
                    this.downloadURL = fileRef.getDownloadURL();
                    fileRef.getDownloadURL().subscribe(x=>{
                        console.log(x);
                        this.t_c = x;
                                this.onRegister()

                    });
                }
            ))
            .subscribe()


    }

    c() {
    if (this.register.valid) {
        this.uploadFile(this.register.get('t_c').value)
    } else {
    this.validateAllFormFields(this.register);

}
    }


    lg() {
        this.router.navigate(['login'])
        // let params = this.route.snapshot.queryParams;
        //
        // if (params.redirectURL) {
        //     this.router.navigateByUrl(params.redirectURL)
        //         .catch(() => this.router.navigate(['login']))
        // } else {
        //
        //     this.router.navigate(['login'])
        // }
    }
    r() {

        let params = this.route.snapshot.queryParams;

        if (params.redirectURL) {
            this.router.navigateByUrl(params.redirectURL)
                .catch(() => this.router.navigate(['submit']))
        } else {

            this.router.navigate(['submit'])
        }
    }

    changed(event: MatTabChangeEvent) {
        //console.log(event)
        if (event.tab.textLabel == 'An Individual'){
            this.user_type = 'Plumber'
        }else {


            this.user_type = event.tab.textLabel
        }
    }
}
