import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../../../core/ListComponent';
import {News} from '../../../models/News';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'newslist-cmp',
  templateUrl: 'newslist.component.html'
})
export class NewsListComponent extends ListComponent<News> {

  constructor(repository: Repository, router: Router, route: ActivatedRoute) {
    super(repository.NewsService, router, route);
    this.itemsPerPage = 20;
  }
}
