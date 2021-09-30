import {Routes} from '@angular/router';
import {ApproveSubmissionsComponent} from './approve-submissions.component';

export const StoreRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'approve-submissions',
        component: ApproveSubmissionsComponent
    }]
}
];
