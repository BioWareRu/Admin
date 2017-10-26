import {Component, ChangeDetectionStrategy} from '@angular/core';
import {
    ListComponent
} from '../../../core/lists/ListComponent';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../../core/AppState';
import {UserRights, UserService} from '../../../services/UserService';
import {ListTableColumnAction} from '../../../core/lists/ListTableColumnAction';
import {ListTableColumn} from '../../../core/lists/ListTableColumn';
import {GalleryCategory} from '../../../models/GalleryCategory';

@Component({
    moduleId: module.id,
    selector: 'app-gallerylist-cmp',
    templateUrl: './galleryList.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryCatsListComponent extends ListComponent<GalleryCategory> {

    constructor(repository: Repository, router: Router, route: ActivatedRoute, appState: AppState, userService: UserService) {
        super(repository.GalleryCategoriesService, router, route, appState, userService);
        this.title = 'Список категорий';
        this.cardTitle = 'Категории';
        this.cardIcon = 'assignment';
        this.provider.itemsPerPage = 20;
        this.provider.columns = [
            new ListTableColumn<GalleryCategory>('id', '#').setSortable(),
            new ListTableColumn<GalleryCategory>('title', 'Заголовок').setSortable()
                .setLinkGetter(galleryCat => ['/gallery/cats', galleryCat.id, 'edit'])
                .setDisabled(!this.can(UserRights.AddGallery)),
            new ListTableColumn<GalleryCategory>('parent', 'Раздел').setCustomGetter((galleryCat) => galleryCat.parentName),
            new ListTableColumn<GalleryCategory>('desc', 'Описание').setCustomGetter((galleryCat) => galleryCat.desc),
            new ListTableColumn<GalleryCategory>('parent', 'Категория').setCustomGetter((galleryCat) => galleryCat.parentCatName),
            new ListTableColumn<GalleryCategory>('actions', '')
                .AddAction(
                    new ListTableColumnAction<GalleryCategory>('Удалить', 'delete').setClick(galleryCat => this.deleteItem(galleryCat.id))
                )
        ];
    }
}
