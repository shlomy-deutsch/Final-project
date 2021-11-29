import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { NotifyService } from './notify.service';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    // private notify: NotifyService, 
    private myRouter: Router) {}

  canActivate(): boolean {
    // if user is logged-in & isAdmin
    const authState = store.getState().productsState.auth;
    if (authState.admin ==1) {
      return true;
    }

    // if user isn't logged-in:
    // this.notify.error('You must be logged-in & admin!!1');
   alert("אתה לא אדמין!!")
    this.myRouter.navigateByUrl(authState?'/shopping':'/home');
    return false; // You can't enter the route
  }
}
