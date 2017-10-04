import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NewsRoutes} from './news.routing';
import {NewsListComponent} from './list/newslist.component';
import {RouterModule} from '@angular/router';
import {Repository} from '../../core/Repository';
import {NgxPaginationModule} from 'ngx-pagination';
import {MomentModule} from 'angular2-moment';
import {NewsFormComponent} from './form/newsForm.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {BioFormsModule} from '../../core/forms/FormsModule';
import {CoreModule} from '../../core/CoreModule';

@NgModule({
  declarations: [
    NewsListComponent,
    NewsFormComponent
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
    NgxPaginationModule,
    CKEditorModule,
    BioFormsModule,
    CoreModule
  ]
})
export class NewsModule {
}
