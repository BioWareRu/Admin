import {NgModule} from '@angular/core';
import {ListTableComponent} from './lists/components/list-table.component';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule} from '@angular/router';
import {MomentModule} from 'angular2-moment';

@NgModule({
  declarations: [
    ListTableComponent
  ],
  exports: [
    ListTableComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    MomentModule,
  ]
})
export class CoreModule {

}
