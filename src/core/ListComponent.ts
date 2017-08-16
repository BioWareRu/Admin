import {BaseService} from './BaseService';
import {Observable} from 'rxjs/Rx';

export class ListComponent<T> {

  public currentPage = 1;
  public itemsPerPage = 10;
  public totalItems = 0;
  public dataLoaded = false;
  protected sort = '-id';

  public items: Observable<T[]>;

  constructor(private service: BaseService<T>) {
  }

  public applySort(column: string) {
    if (this.sort === column) {
      this.sort = '-' + column;
    } else {
      this.sort = column;
    }
    this.load(this.currentPage);
  }

  public load(page: number) {
    this.items = this.service.getList(page, this.itemsPerPage, this.sort).do((res) => {
      this.totalItems = res.totalItems;
      this.currentPage = page;
      this.dataLoaded = true;
    }).map((res) => res.data);
  }
}
