import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {NgxSummernoteModule} from 'ngx-summernote';
import {StoreRoutes} from './approve-submissions.routing';
import {ApproveSubmissionsComponent} from './approve-submissions.component';
import {NgxSpinnerModule} from 'ngx-spinner';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StoreRoutes),
        FormsModule,
        MaterialModule,

        NgxSummernoteModule,
        NgxSpinnerModule
    ],
  declarations: [ApproveSubmissionsComponent]
})
export class ApproveSubmissionsModule { }
