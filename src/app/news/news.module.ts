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
import {TextInputComponent} from "../../core/forms/TextInputComponent";
import {ErrorsListComponent} from "../../core/forms/ErrorsListComponent";
import {CKEInputComponent} from "../../core/forms/CKEInputComponent";
import {CKEditorModule} from "ng2-ckeditor";
import {DropDownInputComponent} from "../../core/forms/DropDownInputComponent";

@NgModule({
  declarations: [
    NewsListComponent,
    NewsFormComponent,
    TextInputComponent,
    ErrorsListComponent,
    CKEInputComponent,
    DropDownInputComponent
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
    CKEditorModule
  ]
})
export class NewsModule {
}
