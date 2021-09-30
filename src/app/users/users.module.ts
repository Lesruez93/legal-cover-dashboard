import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {NgxSummernoteModule} from 'ngx-summernote';
import {StoreRoutes} from './users.routing';

import {NgxSpinnerModule} from 'ngx-spinner';
import {UsersComponent} from './users.component';
import {NgAisModule} from 'angular-instantsearch';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StoreRoutes),
        FormsModule,
        MaterialModule,

        NgxSummernoteModule,
        NgxSpinnerModule,
        NgAisModule
    ],
  declarations: [UsersComponent]
})
export class UsersModule { }
