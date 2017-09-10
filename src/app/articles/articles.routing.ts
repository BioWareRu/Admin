import {Routes} from '@angular/router';
import {ArticlesListComponent} from './list/articlesList.component';
import {ArticleFormComponent} from './form/articleForm.component';
import {SettingsResolver} from '../../core/SettingsResolver';


export const ArticlesRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'index',
      component: ArticlesListComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'add',
      resolve: {settings: SettingsResolver},
      component: ArticleFormComponent
    }]
  },
  {
    path: '',
    children: [{
      path: ':id/edit',
      resolve: {settings: SettingsResolver},
      component: ArticleFormComponent
    }]
  }
];
