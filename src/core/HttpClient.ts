import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptionsArgs} from '@angular/http';
import {UserService} from '../services/UserService';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {AppState} from './AppState';
import {RestError} from '../models/RestError';

@Injectable()
export class HttpClient {

  private baseUrl: string = environment.apiUrl;

  private terminateErrorCodes = [
    400, 403, 404, 500, 502, 504
  ];

  constructor(private http: Http, private userService: UserService, private _appState: AppState) {
  }

  public static encodeQueryData(data) {
    let ret = [];
    for (let d in data) {
      if (!data.hasOwnProperty(d)) {
        continue;
      }
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
    return ret.join('&');
  }

  public get (resource, params) {
    return this.canRunQuery() && this.http.get(this.getUrl(resource, params), this.getRequestOptions())
      .catch((error: any) => {
        return this.processError(error);
      });
  }

  public post(resource, data) {
    return this.canRunQuery() && this.http.post(this.getUrl(resource), data, this.getRequestOptions())
      .catch((error: any) => {
        return this.processError(error);
      });
  }

  public put(resource, data) {
    return this.http.put(this.getUrl(resource), data, this.getRequestOptions())
      .catch((error: any) => {
        return this.processError(error);
      });
  }

  private processError(response: any) {
    if (response.status === 401) {
      this.userService.relogin();
    }
    if (this.terminateErrorCodes.indexOf(response.status) > -1) {
      const error = response.json();
      this._appState.notifyDataChanged('httpError', new RestError(error.code, error.errors[0].message));
    }
    return Observable.empty();
  }

  private canRunQuery() {
    return this.userService.isLoggedIn();
  }

  private createAuthorizationHeader(headers: Headers) {
    if (this.userService.isLoggedIn()) {
      headers.append('Authorization', this.userService.getAuthorizationHeader());
    } else {
      this.userService.relogin();
    }
  }

  private getRequestOptions(): RequestOptionsArgs {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    const options: RequestOptionsArgs = {};
    options.headers = headers;

    return options;
  }

  private getUrl(resource: string, params?: object) {
    let url = this.baseUrl + resource + '?';
    if (params) {
      url += HttpClient.encodeQueryData(params);
    }
    return url;
  }
}
