import {Routes} from '@angular/router';
import { ChatComponent } from './chat.component';

export const GeysersRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'chat',
        component: ChatComponent
    }]
}
];
