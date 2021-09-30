import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';
import {MaterialModule} from '../app.module';
import {FormsRoutes} from './forms.routing';

import {ExtendedFormsComponent} from './extendedforms/extendedforms.component';
import {RegularFormsComponent} from './regularforms/regularforms.component';
import {ValidationFormsComponent} from './validationforms/validationforms.component';
import {WizardComponent} from './wizard/wizard.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FormsRoutes),
        FormsModule,
        ReactiveFormsModule,
        TagInputModule,
        MaterialModule
    ],
    exports: [

    ],
    declarations: [
        ExtendedFormsComponent,
        RegularFormsComponent,
        ValidationFormsComponent,
        WizardComponent,

    ]
})

export class Forms {}
