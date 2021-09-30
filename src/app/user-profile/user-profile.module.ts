import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxSpinnerModule} from 'ngx-spinner';
import {MaterialModule} from '../app.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {UserProfileRoutes} from './user-profile.routing';
import {UserProfileComponent} from './user-profile.component';
import {NgpImagePickerModule} from 'ngp-image-picker';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserProfileRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        MatSelectModule,
        MaterialModule,
        MatFormFieldModule,
        NgpImagePickerModule,
    ],
    declarations: [UserProfileComponent]
})

export class UserProfileModule {}
