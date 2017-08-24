import {OAuthService} from 'angular-oauth2-oidc';
import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {environment} from '../environments/environment';
import {AppState} from '../core/AppState';

@Injectable()
export class UserService {

  public User: Observable<User>;

  private user: Subject<User> = new Subject<User>();

  private userLoaded = false;

  constructor(private oauthService: OAuthService, private _appState: AppState) {
    this.oauthService.oidc = false;
    this.oauthService.setStorage(localStorage);
    this.oauthService.loginUrl = 'https://forum.bioware.ru/applications/oauth2server/interface/oauth/authorize.php';
    this.oauthService.tokenEndpoint = 'https://forum.bioware.ru/applications/oauth2server/interface/oauth/token.php';
    this.oauthService.userinfoEndpoint = 'https://forum.bioware.ru/applications/oauth2server/interface/oauth/me.php';

    // URL of the SPA to redirect the user to after login
    this.oauthService.redirectUri = window.location.origin;
    this.oauthService.scope = '';

    // The SPA's id. Register SPA with this id at the auth-server
    this.oauthService.clientId = environment.oauthClientId;

    this.User = this.user.asObservable();
    // This method just tries to parse the token(s) within the url when
    // the auth-server redirects the user back to the web-app
    // It dosn't send the user the the login page

  }

  public login(additionalState?) {
    this.oauthService.tryLogin({
      onTokenReceived: (state) => this.onTokenReceived(state)
    });
    if (!this.isLoggedIn()) {
      this.oauthService.initImplicitFlow(btoa(JSON.stringify(additionalState)));
    } else {
      this._appState.notifyDataChanged('loggedIn', true);
      this.loadUser();
    }
  }

  public relogin() {
    this.oauthService.logOut();
    this.login({currentUrl: location.href});
  }

  public isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  public getUser(): Observable<User> {
    if (!this.userLoaded) {
      this.loadUser();
    }
    return this.User;
  }

  public getAuthorizationHeader() {
    if (this.isLoggedIn()) {
      return this.oauthService.authorizationHeader();
    }
    return null;
  }

  protected onTokenReceived(data) {
    if (data.state) {
      const state = JSON.parse(atob(data.state));
      if (state.currentUrl) {
        location.href = state.currentUrl;
      }
    }
  }

  private loadUser() {
    this.oauthService.loadUserProfile().then((value) => {
      const user = new User();
      user.id = value['id'];
      user.username = value['username'];
      user.displayName = value['displayName'];
      user.profileUrl = value['profileUrl'];
      user.avatar = value['avatar'];
      user.email = value['email'];
      user.group = value['group'];
      user.groupOthers = value['groupOthers'];
      user.reputation = value['reputation'];
      this.user.next(user);
    });
  }
}
