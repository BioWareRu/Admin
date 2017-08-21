import {BaseService} from './BaseService';
import {OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from './AppState';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class ListComponent<T> implements OnInit {
  public currentPage = 1;
  public itemsPerPage = 10;
  public totalItems = 0;
  public dataLoaded = false;
  protected sort = '-id';

  public items: Subject<T[]>;

  constructor(private service: BaseService<T>, private router: Router, private route: ActivatedRoute, private _appState: AppState) {
  }

  ngOnInit() {
    this.items = new BehaviorSubject<T[]>([]);
    this.route.queryParamMap
      .map(params => params.get('page'))
      .subscribe(page => {
        const pageNumber = parseInt(page, 10);
        if (pageNumber >= 1) {
          this.currentPage = pageNumber;
        }
        this.load(this.currentPage);
      });
  }

  public applySort(column: string) {
    if (this.sort === column) {
      this.sort = '-' + column;
    } else {
      this.sort = column;
    }
    this.load(this.currentPage);
  }

  public changePage(page: number) {
    this.router.navigate([], {queryParams: {page: page}, relativeTo: this.route});
  }

  public load(page: number) {
    this.service.getList(page, this.itemsPerPage, this.sort).subscribe((res) => {
      console.log(res.data);
      this.items.next(res.data);
      this.totalItems = res.totalItems;
      this.currentPage = page;
      this.dataLoaded = true;
    });
  }

  public deleteItem(id: number) {
    this.service.delete(id).subscribe((res: boolean) => {
      if (res) {
        this.load(this.currentPage);
      }
    });
  }
}
