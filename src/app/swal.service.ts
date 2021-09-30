import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() {

  }


  show(message,type){

    return swal({
      title: this.capitalize(type),
        text: message,
      type: type,
      confirmButtonClass: "btn btn-info",
      buttonsStyling: false
    }).catch(swal.noop)
  }



  success(){
    return       swal({
      title: 'Payment received',
      text: 'Your payment has been received Thank you',
      type: 'success',
      confirmButtonClass: "btn btn-success",
      buttonsStyling: false
    }).catch(swal.noop)

  }


    pay (amount){


   return swal({
      title: 'Info',
      text: 'You need to subscribe for R'+amount+'/per year to view your submissions',
      type: 'error',
      showCancelButton: true,
       cancelButtonClass:"btn btn-danger",
      confirmButtonText: 'Pay',
      confirmButtonClass: "btn btn-success",
      buttonsStyling: false
    })
  }


  alert(msg,status){
      // @ts-ignore
      return swal({
          title: this.capitalize(status),
          text: msg,
          type: status,
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false
      }).catch(swal.noop)
  }


     capitalize(s)
    {
        return s[0].toUpperCase() + s.slice(1);
    }
}
