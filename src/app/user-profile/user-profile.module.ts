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
import {AgmCoreModule} from '@agm/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserProfileRoutes),
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
            apiKey: 'AIzaSyBRtcgz3fk7wZDTxKm8zsCjSzM4Uk7lY2c',
            libraries: ['places', 'drawing', 'geometry'],
        }),
        NgxSpinnerModule,
        MatSelectModule,
        MaterialModule,
        MatFormFieldModule,
        NgpImagePickerModule,
    ],
    declarations: [UserProfileComponent]
})

export class UserProfileModule {}
