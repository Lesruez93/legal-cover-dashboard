import {Routes} from '@angular/router';
import {InboxComponent} from './inbox.component';

export const GeysersRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'inbox/:id',
        component: InboxComponent
    }]
}
];
