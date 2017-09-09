import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {AppState} from './AppState';
import {RestError} from '../models/RestError';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {AuthService} from '../services/AuthService';

@Injectable()
export class RestClient {

  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public static encodeQueryData(data) {
    const ret = [];
    for (const d in data) {
      if (!data.hasOwnProperty(d)) {
        continue;
      }
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
    return ret.join('&');
  }

  public get (resource, params) {
    return this.httpClient.get(this.getUrl(resource, params));
  }

  public post(resource, data) {
    return this.httpClient.post(this.getUrl(resource), data);
  }

  public put(resource, data) {
    return this.httpClient.put(this.getUrl(resource), data);
  }

  public delete(resource) {
    return this.httpClient.delete(this.getUrl(resource));
  }

  private getUrl(resource: string, params?: object) {
    let url = this.baseUrl + resource + '?';
    if (params) {
      url += RestClient.encodeQueryData(params);
    }
    return url;
  }
}

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authService.isLoggedIn()) {
      const authReq = req.clone({headers: req.headers.set('Authorization', this._authService.getAuthorizationHeader())});
      return next.handle(authReq);
    } else {
      this._authService.relogin();
    }
  }

}

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _appState: AppState) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._appState.notifyDataChanged('loading', true);
    return next.handle(req).do((response) => {
      if (response instanceof HttpResponse) {
        this._appState.notifyDataChanged('loading', false);
      }
    });
  }
}

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  private terminateErrorCodes = [
    400, 403, 404, 500, 502, 504
  ];

  constructor(private _authService: AuthService, private _appState: AppState) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(() => {

    }, (error) => {
      return this.processError(error);
    });
  }

  private processError(response: any) {
    this._appState.notifyDataChanged('loading', false);
    if (response.status === 401) {
      this._authService.relogin();
    }
    if (this.terminateErrorCodes.indexOf(response.status) > -1) {
      if (response.error) {
        const error = response.error;
        this._appState.notifyDataChanged('httpError', new RestError(error.code, error.errors[0].message));
      } else {
        this._appState.notifyDataChanged('httpError', new RestError(response.status, response.message));
      }
    }
    return Observable.empty;
  }
}
