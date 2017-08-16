import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Headers} from '@angular/http';
import {UserService} from '../services/UserService';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpClient {

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

  private baseUrl: string = 'http://localhost:5001/api/';

  constructor(private http: Http, private userService: UserService) {
  }

  public get (resource, params) {
    return this.http.get(this.getUrl(resource, params), this.getRequestOptions())
      .catch((error: any) => {
        if (error.status === 401) {
          this.userService.relogin();
        }
        return Observable.empty();
      });
  }

  public post(resource, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    console.log(this.getUrl(resource), headers, data);
    return this.http.post(this.getUrl(resource), data, this.getRequestOptions());
  }

  public put(resource, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.getUrl(resource), data, this.getRequestOptions());
  }

  private createAuthorizationHeader(headers: Headers) {
    if (this.userService.isLoggedIn()) {
      headers.append('Authorization', this.userService.getAuthorizationHeader());
    } else {
      this.userService.relogin();
    }
  }

  private getRequestOptions(): RequestOptionsArgs {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options: RequestOptionsArgs = {};
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
