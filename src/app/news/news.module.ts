import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NewsRoutes} from './news.routing';
import {NewsListComponent} from './list/newslist.component';
import {RouterModule} from '@angular/router';
import {Repository} from '../../core/Repository';
import {NgxPaginationModule} from 'ngx-pagination';
import {MomentModule} from 'angular2-moment';

@NgModule({
  declarations: [
    NewsListComponent,
  ],
  providers: [
    Repository
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(NewsRoutes),
    MomentModule,
    NgxPaginationModule
  ]
})
export class NewsModule {
}
