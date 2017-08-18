import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {APISettings} from '../models/APISettings';
import {Observable} from 'rxjs/Observable';
import {SettingsService} from '../services/SettingsService';
import {Injectable} from '@angular/core';

@Injectable()
export class SettingsResolver implements Resolve<APISettings> {

  constructor(private _settingService: SettingsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<APISettings> {
    return this._settingService.get();
  }

}
