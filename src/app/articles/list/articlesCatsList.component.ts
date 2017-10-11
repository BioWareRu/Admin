import {Component, ChangeDetectionStrategy} from '@angular/core';
import {
    ListComponent} from '../../../core/lists/ListComponent';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../../core/AppState';
import {UserRights, UserService} from '../../../services/UserService';
import {ArticleCategory} from '../../../models/ArticleCategory';
import {ListTableColumnAction} from '../../../core/lists/ListTableColumnAction';
import {ListTableColumn} from '../../../core/lists/ListTableColumn';

@Component({
    moduleId: module.id,
    selector: 'app-articleslist-cmp',
    templateUrl: './articlesList.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesCatsListComponent extends ListComponent<ArticleCategory> {

    constructor(repository: Repository, router: Router, route: ActivatedRoute, appState: AppState, userService: UserService) {
        super(repository.ArticleCategoriesService, router, route, appState, userService);
        this.title = 'Список категорий';
        this.cardTitle = 'Категории';
        this.cardIcon = 'assignment';
        this.provider.itemsPerPage = 20;
        this.provider.columns = [
            new ListTableColumn<ArticleCategory>('id', '#').setSortable(),
            new ListTableColumn<ArticleCategory>('title', 'Заголовок').setSortable()
                .setLinkGetter(articleCat => ['/articles/cats', articleCat.id, 'edit'])
                .setDisabled(!this.can(UserRights.AddArticles)),
            new ListTableColumn<ArticleCategory>('parent', 'Раздел').setCustomGetter((articleCat) => articleCat.parentName),
            new ListTableColumn<ArticleCategory>('descr', 'Описание').setCustomGetter((article) => article.descr),
            new ListTableColumn<ArticleCategory>('parent', 'Категория').setCustomGetter((article) => article.parentCatName),
            new ListTableColumn<ArticleCategory>('actions', '')
                .AddAction(
                    new ListTableColumnAction<ArticleCategory>('Удалить', 'delete').setClick(articleCat => this.deleteItem(articleCat.id))
                )
        ];
    }
}
