import {Model} from '../../models/Model';
import {SortDirection} from '../SortDirection';
import {ListTableColumnType} from './ListEnums';
import {ListTableColumnAction} from './ListTableColumnAction';

export class ListTableColumn<T = Model> {
  public Title: string;
  public Key: string;
  public Sortable: boolean;
  public Sorted: SortDirection;
  public Type: ListTableColumnType;
  public Disabled: boolean;
  public Actions: ListTableColumnAction<T>[] = [];

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

  public getValue(model: T) {
    if (this.getter) {
      return this.getter(model);
    }
    return model.hasOwnProperty(this.Key) ? model[this.Key] : null;
  }

  public getLink(model: T) {
    if (this.linkGetter) {
      return this.linkGetter(model);
    }
    return null;
  }
}
