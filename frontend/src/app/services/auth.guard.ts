import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { NotifyService } from './notify.service';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        // private notify: NotifyService,
        private myRouter: Router
    ) {}
    
    canActivate(): boolean {
           const user = store.getState().productsState.auth;
           if(user.open!=1){
            alert("התחל קניה קודם")
            this.myRouter.navigateByUrl("/home");
            return false; // You can't enter the route
        }
        if (user) {
            if(user.admin==true){
                alert("אתה אדמין");
                this.myRouter.navigateByUrl("/admin");
            }
            return true;
        }
    
        // this.notify.error("You must be logged-in!!1");
        alert("אתה לא לוגין")
        this.myRouter.navigateByUrl("/home");
        return false; // You can't enter the route
    }
}
