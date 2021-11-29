import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from '../../models/product.model';
import ProductModel1 from '../../models/category.model';
import { setAuth, setCart_ID } from '../../redux/redux.component';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import store from 'src/app/redux/store';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public username:string = store.getState().productsState.auth.username
  public updating:number = 0
  public products?: ProductModel[];
  public categories: [] | any;
  public results: string = ""
  public searchme: string | any;
  public found: number = 0;
  public newproducts?: ProductModel[]=[]
  tabs = [{ category_ID: 0, category_Name: '' }];
  product = new ProductModel();
  public nameControl: FormControl
  public priceControl: FormControl
  public categoryControl: FormControl
  public imageControl: FormControl
  public showFiller = true;
  private unsubscribeMe: Unsubscribe|any;
  public id : number|any;
  public selected : number |any
  myFormGroup: FormGroup | any;

  constructor(
    private myRouter: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.nameControl = new FormControl(null, Validators.required);
    this.priceControl = new FormControl(null, Validators.required);
    this.categoryControl = new FormControl(null, Validators.required);
    this.imageControl = new FormControl(null);
    this.myFormGroup = new FormGroup({
      dateControl: this.nameControl,
      creditControl: this.priceControl,
      cityControl: this.categoryControl,
      streetControl: this.imageControl,
    });
    }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });
  }

  addTab() {
    this.tabs.push();
  }
  setval(){
    this.showFiller = true
    this.updating = 1
    const name = store.getState().productsState.product.name
    this.nameControl.setValue(name);
    const price = store.getState().productsState.product.price
    this.priceControl.setValue(price);
    const category = store.getState().productsState.product.category_ID
    this.categoryControl.setValue(category);
  }

  
  async ngOnInit() {
    this.unsubscribeMe = store.subscribe(async () => {
     this.updating = await store.getState().productsState.product.price
      const name =  store.getState().productsState.product.name
       this.nameControl.setValue(name);
       const price =  store.getState().productsState.product.price
       this.priceControl.setValue(price);
       const category =  store.getState().productsState.product.category_ID
       this.categoryControl.setValue(category);
      
       })
    this.showFiller = false;
    try {
      this.categories = await this.http
        .get<[]>('http://localhost:3000/api/products/categories/')
        .toPromise();
      this.tabs = this.categories;
      this.getproducts(1)
    } catch (err:any) {
      console.log(err);
      if(err.status == 403){alert("login again please");
      localStorage.removeItem("user");
      this.myRouter.navigateByUrl("/home");
      }
    }
  }

  public async getproducts(e:Event|number|any) {
     if(e.index >= 0 ){
     this.id = e.index + 1}
    else{
      this.id = e
    }
    try {
      this.products = await this.http.get<ProductModel[]>('http://localhost:3000/api/products/' + this.id + '/')
  .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  public saveImage(args: Event): void {
    this.product.image = (args.target as HTMLInputElement).files;
  }

  public async update() {
    try {
      const myFormData = ProductModel.convertToFormData(this.product);
      const add = await this.http.put<ProductModel>('http://localhost:3000/api/products/'+store.getState().productsState.product.id+"/", myFormData).toPromise();
    this.getproducts(this.product.category_ID);
    this.selected = this.product.category_ID-1;
    this.updating =0 

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
  public logout(){
    this.myRouter.navigateByUrl("/home")
    store.dispatch(setAuth(null))
    localStorage.removeItem("user");
    localStorage.removeItem("cart")
  }
}

// import {AdminComponent}
@Component({
  providers:[AdminComponent ],

  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  public categories: [] | any;
  public product = new ProductModel();
  constructor(
    private comp: AdminComponent,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    try {

      this.categories = await this.http
        .get<[]>('http://localhost:3000/api/products/categories/')
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  public saveImage(args: Event): void {
    this.product.image = (args.target as HTMLInputElement).files;
  }

  public async add() {
    try {
      const myFormData = ProductModel.convertToFormData(this.product);
      const add = await this.http
        .post<ProductModel>('http://localhost:3000/api/products/', myFormData)
        .toPromise();
      this.onNoClick();
      // this.comp.getproducts(this.product.category_ID);
    } catch (err) {
      console.log(err);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    // this.comp.getproducts(1);
    // this.comp.selected = 3;
    // this.comp.ngOnInit()
    
    

  }
 
}
