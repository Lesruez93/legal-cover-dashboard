import {Routes} from '@angular/router';
import { PopiaComponent } from './popia.component';

export const GeysersRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'popia',
        component: PopiaComponent
    }]
}
];
