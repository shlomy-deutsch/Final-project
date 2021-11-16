import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { setAuth, setCart_ID } from '../../../redux/redux.component';
import store from 'src/app/redux/store';
import LoginModel from '../../../models/login.model';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public date: number|any =[]
  public open: any = null;
  public products: number|any
  public orders: number =0
  public auth?: LoginModel[] |any = [];
  

  
  constructor(
    private _formBuilder: FormBuilder,
    private myRouter: Router,
    private http : HttpClient,
    private notify: NotifyService,
    ) {}

   async ngOnInit() {

     try{this.products = await this.http.get<any>("http://localhost:3000/api/auth/products").toPromise();}
     catch(err){console.log(err);
     }
     try{this.orders = await this.http.get<any>("http://localhost:3000/api/auth/order").toPromise();}
     catch(err){console.log(err);
     }
    const user = store.getState().productsState.auth;
    if(user != undefined){
      this.auth= user;
      if(this.auth.admin === 1||this.auth.admin === true){
        this.myRouter.navigateByUrl("/admin");
        return
    }
      this.open = this.auth.open;
      try {this.date = await this.http.get<any>("http://localhost:3000/api/auth/date/" +this.auth.castumer_ID + "/").toPromise();      
      } catch (err) {console.log(err);}
    }
    else{
     this.auth = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });}
    }
  public async send(){
   
    try {
  
      const myFormData = LoginModel.convertToFormData(this.auth);
      this.auth = await this.http.post<LoginModel>("http://localhost:3000/api/auth/login/", myFormData).toPromise();
      this.open = this.auth.open;
      store.dispatch(setAuth(this.auth))
      
        if(this.open == 1|| this.open == 2){
          try {
            this.date = await this.http
              .get<any>("http://localhost:3000/api/auth/date/" +this.auth.castumer_ID + "/")
              .toPromise();      
          } catch (err) {
            console.log(err);
          }
        
        }
        if(this.auth.admin === 1||this.auth.admin === true){
          this.myRouter.navigateByUrl("/admin");
      }
    } catch (err:any) {
			this.notify.error("שגיאה בקוד או בשם משתמש");
     
    }
   }  
   public async newshop(){
     try{
     const cartid= await this.http.post<ProductModel>("http://localhost:3000/api/products/carts/", {"castumer_ID": this.auth.castumer_ID}).toPromise();
     store.dispatch(setCart_ID(cartid));
    const user = store.getState().productsState.auth;
    user.open = 1;
    store.dispatch(setAuth(user))
     this.myRouter.navigateByUrl("/shopping");
     }
     catch(err){
       console.log(err); 
     }
   }
   public async returnshop(){
    try{
      const cartid= await this.http.put<ProductModel>("http://localhost:3000/api/products/carts/"+this.auth.castumer_ID+"/", {"castumer_ID":this.auth.castumer_ID}).toPromise();
      store.getState().productsState.cart_ID;
      store.dispatch(setCart_ID(cartid));
      this.myRouter.navigateByUrl("/shopping");
      }
      catch(err){
        console.log(err); 
      }
   }
}
