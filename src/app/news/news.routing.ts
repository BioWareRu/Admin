import {Routes} from '@angular/router';
import {NewsListComponent} from './list/newslist.component';
import {NewsFormComponent} from './form/newsForm.component';


export const NewsRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'index',
            component: NewsListComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'add',
            component: NewsFormComponent
        }]
    },
    {
        path: '',
        children: [{
            path: ':id/edit',
            component: NewsFormComponent
        }]
    }/*, {
    path: '',
    children: [{
      path: 'wizard',
      component: WizardComponent
    }]
  }*/
];
