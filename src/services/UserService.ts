import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  public User: Observable<User>;

  private user: Subject<User> = new Subject<User>();

  private userLoaded = false;

  constructor(private oauthService: OAuthService) {
    this.oauthService.loginUrl = 'https://forum.bioware.ru/applications/oauth2server/interface/oauth/authorize.php';
    this.oauthService.tokenEndpoint = 'https://forum.bioware.ru/applications/oauth2server/interface/oauth/token.php';
    this.oauthService.userinfoEndpoint = 'https://forum.bioware.ru/applications/oauth2server/interface/oauth/me.php';

    // URL of the SPA to redirect the user to after login
    this.oauthService.redirectUri = window.location.origin;

    // The SPA's id. Register SPA with this id at the auth-server
    this.oauthService.clientId = '1ac1047fb3861d96c971';

    this.User = this.user.asObservable();
    // This method just tries to parse the token(s) within the url when
    // the auth-server redirects the user back to the web-app
    // It dosn't send the user the the login page
    this.oauthService.tryLogin({});
  }

  public login() {
    if (!this.isLoggedIn()) {
      this.oauthService.initImplicitFlow();
    } else {
      this.loadUser();
    }
  }

  public isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  public getUser(): Observable<User> {
    if (!this.isLoggedIn()) {
      this.oauthService.initImplicitFlow();
    } else {
      if (!this.userLoaded) {
        this.loadUser();
      }
      return this.User;
    }
  }

  public getAuthorizationHeader() {
    if (this.isLoggedIn()) {
      return this.oauthService.authorizationHeader();
    }
    return null;
  }

  public relogin() {
    this.oauthService.logOut();
    this.login();
  }

  private loadUser() {
    this.oauthService.loadUserProfile().then((value) => {
      let user = new User();
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
