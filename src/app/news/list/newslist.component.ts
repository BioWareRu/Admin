import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ListComponent, ListTableColumn, ListTableColumnAction, ListTableColumnType} from '../../../core/lists/ListComponent';
import {News} from '../../../models/News';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../../core/AppState';
import {UserService} from '../../../services/UserService';

@Component({
  moduleId: module.id,
  selector: 'newslist-cmp',
  templateUrl: '../../../core/lists/list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent extends ListComponent<News> {

  constructor(repository: Repository, router: Router, route: ActivatedRoute, appState: AppState, userService: UserService) {
    super(repository.NewsService, router, route, appState, userService);
    this.title = 'Список новостей';
    this.cardTitle = 'Новости';
    this.cardIcon = 'assignment';
    this.itemsPerPage = 20;
    this.columns = [
      new ListTableColumn<News>('id', '#').setSortable(),
      new ListTableColumn<News>('title', 'Заголовок').setSortable()
        .setLinkGetter(news => ['/news', news.id, 'edit'])
        .setDisabled(!this.can(this.userRights.AddNews)),
      new ListTableColumn<News>('date', 'Дата', ListTableColumnType.TimeAgo).setSortable(),
      new ListTableColumn<News>('parent', 'Раздел').setCustomGetter((news) => news.parentName),
      new ListTableColumn<News>('authorId', 'Автор').setCustomGetter((news) => news.authorName).setSortable(),
      new ListTableColumn<News>('actions', '')
        .AddAction(
          new ListTableColumnAction<News>('Просмотреть на сайте', 'pageview').setExternal(news => news.publicUrl)
        )
        .AddAction(
          new ListTableColumnAction<News>('Удалить новость', 'delete').setClick(news => this.deleteItem(news.id))
        )
    ];
  }

  public getRowClass(model: News): { [key: string]: boolean } {
    return {'unpublished': model.pub !== 1, 'sticky': model.sticky === 1};
  }
}
