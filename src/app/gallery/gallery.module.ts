import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Repository} from '../../core/Repository';
import {NgxPaginationModule} from 'ngx-pagination';
import {MomentModule} from 'angular2-moment';
import {CKEditorModule} from 'ng2-ckeditor';
import {BioFormsModule} from '../../core/forms/FormsModule';
import {CoreModule} from '../../core/CoreModule';
import {GalleryRoutes} from './gallery.routing';
import {GalleryCatsListComponent} from './list/galleryCatList.component';
import {GalleryCatFormComponent} from './form/galleryCatForm.component';

@NgModule({
    declarations: [
        GalleryCatsListComponent,
        GalleryCatFormComponent
    ],
    providers: [
        Repository
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(GalleryRoutes),
        MomentModule,
        NgxPaginationModule,
        CKEditorModule,
        BioFormsModule,
        CoreModule
    ]
})
export class GalleryModule {
}
