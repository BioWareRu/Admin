import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../services/UserService';
import {AuthService} from '../services/AuthService';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _userService: UserService, private _authService: AuthService) {

  }

  public canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('can activate');
    if (this._authService.isLoggedIn()) {
      if (this._userService.isUserLoaded()) {
        console.log('true');
        return true;
      } else {
        console.log('load user');
        return this._userService.loadUser();
      }
    } else {
      console.log('login');
      this._authService.login();
    }
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('can activate child');
    return this.canActivate(childRoute, state);
  }
}
