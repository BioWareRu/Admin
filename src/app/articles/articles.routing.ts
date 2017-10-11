import {Routes} from '@angular/router';
import {ArticlesListComponent} from './list/articlesList.component';
import {ArticlesCatsListComponent} from './list/articlesCatsList.component';
import {ArticleFormComponent} from './form/articleForm.component';
import {ArticlesCatFormComponent} from './form/articlesCatForm.component';
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
      },
      {
        path: 'cats/:id/edit',
        resolve: {settings: SettingsResolver},
        component: ArticlesCatFormComponent
      },
      {
        path: 'cats/add',
        resolve: {settings: SettingsResolver},
        component: ArticlesCatFormComponent
      }
    ]
  }
];
