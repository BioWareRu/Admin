import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthGuard} from '../core/AuthGuard';

export const AppRoutes: Routes = [
  /*  {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },*/
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'news',
        loadChildren: './news/news.module#NewsModule'
      },
      {
        path: 'articles',
        loadChildren: './articles/articles.module#ArticlesModule'
      },
      {
        path: 'gallery',
        loadChildren: './gallery/gallery.module#GalleryModule'
      }
    ]
  }
];
