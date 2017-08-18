import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AppState {

  private _data: { [id: string]: BehaviorSubject<Object>; } = {};

  constructor() {
  }

  private getOrCreate(key: string): BehaviorSubject<Object> {
    if (!this._data[key]) {
      this._data[key] = new BehaviorSubject<Object>(null);
    }
    return this._data[key];
  }

  public notifyDataChanged(key: string, value) {
    this.getOrCreate(key).next(value);
  }

  public subscribe(key: string) {
    return this.getOrCreate(key);
  }

}
