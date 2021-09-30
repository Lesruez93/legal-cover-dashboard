import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxSpinnerModule} from 'ngx-spinner';
import {MaterialModule} from '../app.module';
import {InboxComponent} from './inbox.component';
import {GeysersRoutes} from './inbox.routing';
import {MatSelectModule} from '@angular/material/select';
import {MomentModule} from 'ngx-moment';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(GeysersRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        MatSelectModule,
        MaterialModule,
        MomentModule
    ],
    declarations: [InboxComponent]
})

export class InboxModule {}
