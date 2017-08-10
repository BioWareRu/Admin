import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../../../core/ListComponent';
import {News} from '../../../models/News';
import {Repository} from '../../../core/Repository';

@Component({
  moduleId: module.id,
  selector: 'newslist-cmp',
  templateUrl: 'newslist.component.html'
})
export class NewsListComponent extends ListComponent<News> implements OnInit {

  constructor(protected repository: Repository) {
    super(repository.NewsService);
    this.itemsPerPage = 20;
  }

  public ngOnInit() {
    this.load(this.currentPage);

    console.log('hello `News` component');
  }
}
