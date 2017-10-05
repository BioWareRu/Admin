import {Routes} from '@angular/router';
import {NewsListComponent} from './list/newslist.component';
import {NewsFormComponent} from './form/newsForm.component';
import {SettingsResolver} from '../../core/SettingsResolver';


export const NewsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'index',
        component: NewsListComponent
      },
      {
        path: 'add',
        resolve: {settings: SettingsResolver},
        component: NewsFormComponent
      },
      {
        path: ':id/edit',
        resolve: {settings: SettingsResolver},
        component: NewsFormComponent
      }
    ]
  },
];
