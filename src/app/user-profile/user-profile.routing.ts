import { Routes } from '@angular/router';
import {UserProfileComponent} from './user-profile.component';


export const UserProfileRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'profile/:id',
        component: UserProfileComponent
    }]
}
];
