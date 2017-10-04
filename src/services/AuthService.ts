import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {AppState} from '../core/AppState';
import {environment} from '../environments/environment';

@Injectable()
export class AuthService {

  constructor(private oauthService: OAuthService, private _appState: AppState) {
    this.oauthService.oidc = false;
    this.oauthService.setStorage(localStorage);
    this.oauthService.loginUrl = 'https://forum.bioware.ru/applications/oauth2server/interface/oauth/authorize.php';
    this.oauthService.tokenEndpoint = 'https://forum.bioware.ru/applications/oauth2server/interface/oauth/token.php';
    this.oauthService.userinfoEndpoint = 'https://forum.bioware.ru/applications/oauth2server/interface/oauth/me.php';
    this.oauthService.redirectUri = window.location.origin;
    this.oauthService.scope = '';
    this.oauthService.clientId = environment.oauthClientId;
  }

  public login(additionalState?) {
    this.oauthService.tryLogin().then(() => {
      if (!this.isLoggedIn()) {
        localStorage.setItem('oauthReturnUrl', location.href);
        this.oauthService.initImplicitFlow(btoa(JSON.stringify(additionalState)));
      } else {
        const url = localStorage.getItem('oauthReturnUrl');
        if (url) {
          localStorage.removeItem('oauthReturnUrl');
          location.href = url;
        } else {
          this._appState.notifyDataChanged('loggedIn', true);
        }
      }
    });
  }

  public relogin() {
    this.oauthService.logOut();
    this.login();
  }

  public isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  public getAuthorizationHeader() {
    if (this.isLoggedIn()) {
      return this.oauthService.authorizationHeader();
    }
    return null;
  }
}

