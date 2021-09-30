import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static uid;
  static church;
  static user_name;
public data : any;
   uid: string;
//  private uid: string;
  constructor(
      private afAuth:AngularFireAuth
  ) {


  }
 isAuth(){
    this.afAuth.authState.subscribe(res=>{
  return !!(res && res.uid);
})



}}
