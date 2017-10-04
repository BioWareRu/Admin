import {BaseService} from '../BaseService';
import {OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../AppState';
import {UserRights, UserService} from '../../services/UserService';
import {ListProvider} from './ListProvider';

export class ListComponent<T> implements OnInit {

  public provider: ListProvider<T>;

  protected title = 'Список';
  public cardTitle = '';
  public cardIcon = '';

  constructor(private service: BaseService<T>, private router: Router,
              private route: ActivatedRoute, private _appState: AppState, private _userService: UserService) {
    this.provider = new ListProvider<T>(this.service, this.router, this.route, this._userService);
    this.provider.getRowClass = this.getRowClass;
  }

  ngOnInit() {
    this.provider.init();
    this._appState.notifyDataChanged('title', this.title);
  }

  public getRowClass(model: T): { [key: string]: boolean } {
    return {};
  }

  public can(right: UserRights): boolean {
    return this._userService.hasRight(right);
  }

  public deleteItem(id: number) {
    this.service.delete(id).subscribe((res: boolean) => {
      if (res) {
        this.provider.load();
      }
    });
  }
}

