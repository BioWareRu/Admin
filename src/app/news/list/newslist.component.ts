import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  ListComponent} from '../../../core/lists/ListComponent';
import {News} from '../../../models/News';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../../core/AppState';
import {UserRights, UserService} from '../../../services/UserService';
import {ListTableColumnType} from '../../../core/lists/ListEnums';
import {ListTableColumnAction} from '../../../core/lists/ListTableColumnAction';
import {ListTableColumn} from '../../../core/lists/ListTableColumn';

@Component({
  moduleId: module.id,
  selector: 'app-newslist-cmp',
  templateUrl: './newslist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent extends ListComponent<News> {

  constructor(repository: Repository, router: Router, route: ActivatedRoute, appState: AppState, userService: UserService) {
    super(repository.NewsService, router, route, appState, userService);
    this.title = 'Список новостей';
    this.cardTitle = 'Новости';
    this.cardIcon = 'assignment';
    this.provider.itemsPerPage = 20;
    this.provider.columns = [
      new ListTableColumn<News>('id', '#').setSortable(),
      new ListTableColumn<News>('title', 'Заголовок').setSortable()
        .setLinkGetter(news => ['/news', news.id, 'edit'])
        .setDisabled(!this.can(UserRights.AddNews)),
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
