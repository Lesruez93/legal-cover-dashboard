import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../app.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagesRoutes} from './pages.routing';

import {RegisterComponent} from './register/register.component';
import {PricingComponent} from './pricing/pricing.component';
import {LockComponent} from './lock/lock.component';
import {LoginComponent} from './login/login.component';
import {Forms} from '../forms/forms.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';

// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        Forms,
        NgxSpinnerModule,
        MaterialFileInputModule,
        ShowHidePasswordModule


    ],
  declarations: [
    LoginComponent,
    RegisterComponent,

    PricingComponent,
    LockComponent
  ]
})

export class PagesModule {}
