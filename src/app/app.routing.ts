import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AuthGuardService} from './auth-guard.service';
//import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

//const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',



    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [


          {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            },

          {
              path: '',
              loadChildren: './inbox/inbox.module#InboxModule'
          },

          {
                path: 'forms',
                loadChildren: './forms/forms.module#Forms'
            }, {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            }, {
                path: 'widgets',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            },





          {
              path: '',
              loadChildren: './users/users.module#UsersModule'
          },


          {
              path: '',
              loadChildren: './articles/articles.module#ArticlesModule'
          },

          {
              path: '',
              loadChildren: './res/res.module#ResModule'
          },

          {
              path: '',
              loadChildren: './chat/chat.module#ChatModule',


          },

          {
              path: '',
              loadChildren: './user-profile/user-profile.module#UserProfileModule',


          },


  ],
        canActivate: [AuthGuardService]



    },

    {
        path: '',
        loadChildren: './popia/popia.module#PopiaModule'
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: '',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
