import {Component} from '@angular/core';
import {ListComponent} from '../../../core/ListComponent';
import {News} from '../../../models/News';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../../core/AppState';

@Component({
  moduleId: module.id,
  selector: 'newslist-cmp',
  templateUrl: 'newslist.component.html'
})
export class NewsListComponent extends ListComponent<News> {

  constructor(repository: Repository, router: Router, route: ActivatedRoute, appState: AppState) {
    super(repository.NewsService, router, route, appState);
    this.itemsPerPage = 20;
  }
}
