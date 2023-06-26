import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {ResComponent} from './res.component';
import {ResRoutes} from './res.routing';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ResRoutes),
        FormsModule,
        MaterialModule,
    ],
    declarations: [ResComponent]
})
export class ResModule {
}
