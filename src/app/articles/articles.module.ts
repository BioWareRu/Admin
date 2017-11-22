import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ArticlesRoutes} from './articles.routing';
import {ArticlesListComponent} from './list/articlesList.component';
import {ArticlesCatsListComponent} from './list/articlesCatsList.component';
import {ArticleFormComponent} from './form/articleForm.component';
import {RouterModule} from '@angular/router';
import {Repository} from '../../core/Repository';
import {NgxPaginationModule} from 'ngx-pagination';
import {MomentModule} from 'angular2-moment';
import {CKEditorModule} from 'ng2-ckeditor';
import {BioFormsModule} from '../../core/forms/FormsModule';
import {CoreModule} from '../../core/CoreModule';
import {ArticlesCatFormComponent} from './form/articlesCatForm.component';

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleFormComponent,
    ArticlesCatsListComponent,
    ArticlesCatFormComponent
  ],
  providers: [
    Repository
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ArticlesRoutes),
    MomentModule,
    NgxPaginationModule,
    CKEditorModule,
    BioFormsModule,
    CoreModule
  ]
})
export class ArticlesModule {
}
