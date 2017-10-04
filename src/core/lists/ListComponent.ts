import {BaseService} from '../BaseService';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../AppState';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserRights, UserService} from '../../services/UserService';

@Component({
  moduleId: module.id,
  templateUrl: 'list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent<T> implements OnInit {
  public currentPage = 1;
  public itemsPerPage = 10;
  public totalItems = 0;
  public dataLoaded = false;
  public items: Subject<T[]>;
  public cardTitle = '';
  public cardIcon = '';
  public columns: ListTableColumn<T>[];
  public sortDirection = SortDirection;
  public columnTypes = ListTableColumnType;
  public actionTypes = ListTableColumnActionType;
  public userRights = UserRights;
  protected title = 'Список';
  private sort = '-id';

  constructor(private service: BaseService<T>, private router: Router,
              private route: ActivatedRoute, private _appState: AppState, private _userService: UserService) {
  }

  private static getSortKey(column: string, desc: boolean = false): string {
    let sortKey = column;
    if (desc) {
      sortKey = '-' + sortKey;
    }
    return sortKey;
  }

  ngOnInit() {
    this.items = new BehaviorSubject<T[]>([]);
    this.route.queryParamMap.subscribe(params => {
      const pageNumber = parseInt(params.get('page'), 10);
      if (pageNumber >= 1) {
        this.currentPage = pageNumber;
      }
      const sort = params.get('sort');
      if (sort != null) {
        this.sort = sort;
        const key = this.sort.replace('-', '');
        const sortDirection = this.sort.indexOf('-') > -1 ? SortDirection.Desc : SortDirection.Asc;
        this.columns.forEach(col => {
          col.setSorted(col.Key === key ? sortDirection : null);
        });
      }
      this.load(this.currentPage);
    });
    this._appState.notifyDataChanged('title', this.title);
  }

  public applySort(column: string) {
    let sortKey;
    if (this.sort === column) {
      sortKey = ListComponent.getSortKey(column, true);
    } else {
      sortKey = ListComponent.getSortKey(column);
    }
    this.sort = sortKey;
    this.reload();
  }

  public changePage(page: number) {
    this.currentPage = page;
    this.reload();
  }

  public load(page: number) {
    this.service.getList(page, this.itemsPerPage, this.sort).subscribe((res) => {
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

  public getRowClass(model: T): { [key: string]: boolean } {
    return {};
  }

  private reload() {
    this.router.navigate([], {queryParams: {page: this.currentPage, sort: this.sort}, relativeTo: this.route});
  }

  public can(right: UserRights): boolean {
    return this._userService.hasRight(right);
  }
}

export class ListTableColumn<T> {
  public Title: string;
  public Key: string;
  public Sortable: boolean;
  public Sorted: SortDirection;
  public Type: ListTableColumnType;
  public Actions: ListTableColumnAction<T>[] = [];
  public Disabled: boolean;

  private getter: (model: T) => {};
  private linkGetter: (model: T) => {};

  constructor(key: string, title: string, type: ListTableColumnType = ListTableColumnType.Text) {
    this.Key = key;
    this.Title = title;
    this.Type = type;
  }

  public setSortable(sortable: boolean = true): ListTableColumn<T> {
    this.Sortable = sortable;
    return this;
  }

  public setSorted(direction: SortDirection): ListTableColumn<T> {
    this.Sorted = direction;
    return this;
  }

  public setCustomGetter(getter: (model: T) => {}): ListTableColumn<T> {
    this.getter = getter;
    return this;
  }

  public setLinkGetter(linkGetter: (model: T) => {}): ListTableColumn<T> {
    this.Type = ListTableColumnType.Link;
    this.linkGetter = linkGetter;
    return this;
  }

  public AddAction(action: ListTableColumnAction<T>): ListTableColumn<T> {
    this.Type = ListTableColumnType.Actions;
    this.Actions.push(action);
    return this;
  }

  public setDisabled(disabled: boolean): ListTableColumn<T> {
    this.Disabled = disabled;
    return this;
  }

  protected getValue(model: T) {
    if (this.getter) {
      return this.getter(model);
    }
    return model.hasOwnProperty(this.Key) ? model[this.Key] : null;
  }

  protected getLink(model: T) {
    if (this.linkGetter) {
      return this.linkGetter(model);
    }
    return null;
  }
}

export class ListTableColumnAction<T> {
  public Icon: string;
  public Title: string;
  public Type: ListTableColumnActionType;
  public GenerateUrl: (model: T) => string;
  public DoClick: (model: T) => any;

  constructor(title: string, icon: string, type: ListTableColumnActionType = ListTableColumnActionType.Click) {
    this.Title = title;
    this.Icon = icon;
    this.Type = type;
  }

  public setClick(click: (model: T) => any): ListTableColumnAction<T> {
    this.Type = ListTableColumnActionType.Click;
    this.DoClick = click;
    return this;
  }

  public setExternal(externalLinkGenerator: (model: T) => string): ListTableColumnAction<T> {
    this.Type = ListTableColumnActionType.ExternalLink;
    this.GenerateUrl = externalLinkGenerator;
    return this;
  }

  public Click(model: T) {
    this.DoClick(model);
  }
}

export enum ListTableColumnActionType {
  Click, ExternalLink
}

export enum ListTableColumnType {
  Text, Link, Date, TimeAgo, Actions
}

export enum SortDirection {
  Asc, Desc
}
