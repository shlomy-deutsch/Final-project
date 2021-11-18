import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { setTotal } from 'src/app/redux/redux.component';
import { setAuth, setCart_ID } from '../../redux/redux.component';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import ProductModel from '../../models/product.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent implements OnInit {
  public id: number =0;
  public username:string = store.getState().productsState.auth.username
  public total: number = 0;
  public showFiller: boolean = true;
  public results: string = ""
  public selected: number = 0;
  public searchme: string | any;
  public found: number = 0;
  public newproducts?: ProductModel[]=[]
  public products?: ProductModel[];
  public categories: [] | any;
  tabs = [{ category_ID: 0, category_Name: '' }];

  constructor(
    private myRouter: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private notify: NotifyService,
  ) {}

  addTab() {
    this.tabs.push();
  }

  async ngOnInit() {
    this.showFiller = true;
   const auth =await store.getState().productsState.auth;
    if (auth.open == 1){
    this.notify.success("אתה באמצע קנייה מתאריך"+" "+auth.date.slice(0, 10))}
    if(auth.open==2){
      this.notify.success("קנייתך האחרונה בוצעה בתאריך"+" "+auth.date.slice(0, 10))
       }
        try {
      this.categories = await this.http
        .get<[]>('http://localhost:3000/api/products/categories/')
        .toPromise();
      this.tabs = this.categories;
      this.getproducts(1)
    } catch (err:any) {
      console.log(err);
      if(err.status == 403){alert("login again please");this.myRouter.navigateByUrl("/home")
      localStorage.removeItem("user");
    localStorage.removeItem("cart")}
    }
  }

  public async getproducts(e: Event | any) {
    if(e.index >= 0 ){
      this.id = e.index + 1}
     else{
       this.id = e}

    try {
      this.products = await this.http
        .get<ProductModel[]>('http://localhost:3000/api/products/' + this.id + '/')
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }
  public async search() {
    try {
      this.newproducts = await this.http
        .get<ProductModel[]>(
          'http://localhost:3000/api/products/search/' + this.searchme + '/'
        )
        .toPromise();
        this.results= "תוצאת חיפוש"
      if (this.newproducts.length == 0) {
        this.found = 2;
        this.results= "אין תוצאות חיפוש"
      }
      
      this.found = 1;
      this.selected = this.tabs.length;
    } catch (err) {
      console.log(err);
    }
  }
  public go(){
    if(store.getState().productsState.products.length==0){alert("שים לפחות מוצר אחד בעגלה")}
    else{
    this.myRouter.navigateByUrl("/order");
    }
  }
  public logout(){
    this.myRouter.navigateByUrl("/home")
    store.dispatch(setAuth(null))
    localStorage.removeItem("user");
    localStorage.removeItem("cart")

  }
}


