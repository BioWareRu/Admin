import {Routes} from '@angular/router';
import {NewsListComponent} from './list/newslist.component';


export const NewsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'index',
      component: NewsListComponent
    }]
  }, /*{
    path: '',
    children: [{
      path: 'validation',
      component: ValidationFormsComponent
    }]
  }, {
    path: '',
    children: [{
      path: 'wizard',
      component: WizardComponent
    }]
  }*/
];
