import {Routes} from '@angular/router';
import {ArticlesListComponent} from './list/articlesList.component';
import {ArticlesCatsListComponent} from './list/articlesCatsList.component';
import {ArticleFormComponent} from './form/articleForm.component';
import {SettingsResolver} from '../../core/SettingsResolver';


export const ArticlesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'index',
        component: ArticlesListComponent
      },
      {
        path: 'add',
        resolve: {settings: SettingsResolver},
        component: ArticleFormComponent
      },
      {
        path: ':id/edit',
        resolve: {settings: SettingsResolver},
        component: ArticleFormComponent
      },
      {
        path: 'cats',
        component: ArticlesCatsListComponent
      }
    ]
  }
];
