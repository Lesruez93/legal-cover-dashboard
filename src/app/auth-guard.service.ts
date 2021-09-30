import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private redirectUrl: string;
    private uid: any = null;


  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

     this.auth.authState.subscribe(res=>{
      if (res && res.uid) {

          this.uid = true
          return  true

      }
      else {
     //   this.redirectUrl = state.url;
          this.uid = false;
          this.router.navigate(['login'])
              //,{queryParams:{'redirectURL':state.url}});
        return this.uid;
      }
    });
   return true
  }
}
