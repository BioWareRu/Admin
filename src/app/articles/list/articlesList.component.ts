import {Component, ChangeDetectionStrategy} from '@angular/core';
import {
  ListComponent} from '../../../core/lists/ListComponent';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../../core/AppState';
import {UserRights, UserService} from '../../../services/UserService';
import {Article} from '../../../models/Article';
import {ListTableColumnType} from '../../../core/lists/ListEnums';
import {ListTableColumnAction} from '../../../core/lists/ListTableColumnAction';
import {ListTableColumn} from '../../../core/lists/ListTableColumn';

@Component({
  moduleId: module.id,
  selector: 'app-articleslist-cmp',
  templateUrl: './articlesList.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesListComponent extends ListComponent<Article> {

  constructor(repository: Repository, router: Router, route: ActivatedRoute, appState: AppState, userService: UserService) {
    super(repository.ArticlesService, router, route, appState, userService);
    this.title = 'Список статей';
    this.cardTitle = 'Статьи';
    this.cardIcon = 'assignment';
    this.provider.itemsPerPage = 20;
    this.provider.columns = [
      new ListTableColumn<Article>('id', '#').setSortable(),
      new ListTableColumn<Article>('title', 'Заголовок').setSortable()
        .setLinkGetter(article => ['/articles', article.id, 'edit'])
        .setDisabled(!this.can(UserRights.AddArticles)),
      new ListTableColumn<Article>('date', 'Дата', ListTableColumnType.TimeAgo).setSortable(),
      new ListTableColumn<Article>('parent', 'Раздел').setCustomGetter((article) => article.parentName),
      new ListTableColumn<Article>('parent', 'Категория').setCustomGetter((article) => article.catName),
      new ListTableColumn<Article>('authorId', 'Автор').setCustomGetter((article) => article.authorName).setSortable(),
      new ListTableColumn<Article>('actions', '')
        .AddAction(
          new ListTableColumnAction<Article>('Просмотреть на сайте', 'pageview').setExternal(article => article.publicUrl)
        )
        .AddAction(
          new ListTableColumnAction<Article>('Удалить статью', 'delete').setClick(article => this.deleteItem(article.id))
        )
    ];
  }

  public getRowClass(model: Article): { [key: string]: boolean } {
    return {'unpublished': model.pub !== 1};
  }
}
