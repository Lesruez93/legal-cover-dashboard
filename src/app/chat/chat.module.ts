import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxSpinnerModule} from 'ngx-spinner';
import {MaterialModule} from '../app.module';
import {ChatComponent} from './chat.component';
import {GeysersRoutes} from './chat.routing';
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
    declarations: [ChatComponent]
})

export class ChatModule {}
