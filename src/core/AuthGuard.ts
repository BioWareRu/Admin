import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../services/UserService';
import {AuthService} from '../services/AuthService';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _userService: UserService, private _authService: AuthService) {

  }

  public canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.isLoggedIn()) {
      if (this._userService.isUserLoaded()) {
        return true;
      } else {
        return this._userService.loadUser();
      }
    } else {
      this._authService.login();
    }
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }
}
