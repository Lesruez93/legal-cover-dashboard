import {Routes} from '@angular/router';
import {ResComponent} from './res.component';


export const ResRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'resources',
        component: ResComponent
    }]
}
];
