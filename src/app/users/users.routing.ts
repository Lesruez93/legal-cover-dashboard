import {Routes} from '@angular/router';

import {UsersComponent} from './users.component';

export const StoreRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'users',
        component: UsersComponent
    }]
}
];
