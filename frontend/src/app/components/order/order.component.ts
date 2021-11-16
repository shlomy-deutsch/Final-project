import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import ProductModel from 'src/app/models/auth.model';
import orderModel from 'src/app/models/order.model';
import PostProductModel from 'src/app/models/post-product.model';
import {
  setAuth,
  setCart_ID,
  setProducts,
  setTotal,
} from 'src/app/redux/redux.component';
import store from 'src/app/redux/store';
import * as fileSaver from 'file-saver';
import { NotifyService } from 'src/app/services/notify.service';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],

})


export class OrderComponent implements OnInit {

  @ViewChild('refEl',{static: false}) refEl: any;
  receipt = "hello";
  public index:number |any
  public good: number = 0;
  results: string[] | any;
  searchTerm: string | any;
  // this.resultArray = []
  public senddata = new orderModel();
  public total: number = 0;
  isEditable = true;
  secondFormGroup: FormGroup | any;
  public citys: string[] = [];
  public auth: ProductModel | any;
  public products: PostProductModel[]|any=[];
  public cityControl: FormControl;
  public dateControl: FormControl;
  public creditControl: FormControl;
  public streetControl: FormControl;
  constructor(
    private _formBuilder: FormBuilder,
    private myRouter: Router,
    private http: HttpClient,
    private notify: NotifyService,
    private renderer: Renderer2
  ) {
    this.dateControl = new FormControl(null, Validators.required);
    this.creditControl = new FormControl(null, Validators.required);
    this.cityControl = new FormControl(null, Validators.required);
    this.streetControl = new FormControl(null, Validators.required);

    this.secondFormGroup = new FormGroup({
      dateControl: this.dateControl,
      creditControl: this.creditControl,
      cityControl: this.cityControl,
      streetControl: this.streetControl,
    })
  }
  public imageUrl = 'http://localhost:3000/api/products/images/';

  updateSearch(e: any) {
    this.searchTerm = e.target.value;
  }
  async ngOnInit() {
    this.citys =["Tel aviv", "jerusalem", "Afule", "Ashdod", "Haifa", "Beer-Sheva", "Ramat-Gan", "Bnei-Brak", "Petach-Tikva", "Eilat"]
    this.total = store.getState().productsState.total;
    const cartid = store.getState().productsState.cart_ID;
    try {
      const myprod = await this.http
        .get<any>('http://localhost:3000/api/products/cart/' + cartid + '/')
        .toPromise();
      this.products = myprod;
      store.dispatch(setProducts(myprod));
      const arr = [];
      for (let i of myprod) {
        arr.push(i.total_Price);
      }
      this.total = arr.reduce((a: number, b: number) => a + b, 0);
      store.dispatch(setTotal(this.total));
    } catch (err: any) {
      if (err.status == 403) {
        alert('login again please');
        this.myRouter.navigateByUrl('/home');
      }
    }
  }
  public goback() {
    this.myRouter.navigateByUrl('/shopping');
  }
  public func(e: Event) {
    const my = (e.target as HTMLInputElement).name;
    if (my == 'street') {
      let data1 = store.getState().productsState.auth.street;
      this.streetControl.setValue(data1);
    } else {
      let data1 = store.getState().productsState.auth.city;
      this.cityControl.setValue(data1);
    }
  }
  public async send() {
    try {
      this.senddata.castumer_ID =
        store.getState().productsState.auth.castumer_ID;
      this.senddata.cart_ID = store.getState().productsState.cart_ID;
      this.senddata.total_Price = this.total;
      const myFormData = orderModel.convertToFormData(this.senddata);
      const add = await this.http
        .post<orderModel>(
          'http://localhost:3000/api/products/order/',
          myFormData
        )
        .toPromise();
      this.good = 1;
      store.dispatch(setCart_ID(null));
     const user = store.getState().productsState.auth;
     user.open = 2;
     user.toke
     store.dispatch(setAuth(user))
    } catch (err: any) {
			this.notify.error(err);
    }
  }

  public downloadme() {
    let new2 = [];
    for (let p of this.products) {
      new2.push(
        'name:' +
          ' ' +
          p.name +
          ' ' +
          'count:' +
          ' ' +
          p.count +
          ' ' +
          'price:' +
          ' ' +
          p.total_Price +
          '\n'
      );
    }
    new2.push('Total Price:' + ' ' + this.total);
    var data = new Blob(new2, { type: 'txt/plain' });
    fileSaver.saveAs(data, 'file.text');
  }
  public confirm() {
    this.myRouter.navigateByUrl('/home');
  }
  
  onSearchChange(value:any){
    if(value.length==0){
      return 
    }
    for (let p of this.products)
    if((p.name).includes(value)){
      this.index = p.name
      this.renderer.setProperty(
      this.refEl.nativeElement,
       'innerHTML',
       this.getFormattedText(value)
     );       
   };
  }
 
  getFormattedText(value:any){
     const valuestring = value.trim().split(' ')
     const re = new RegExp(`(${ valuestring.join('|') })`, 'g');
    
     return this.index.replace(re, `<span class="tes">$1</span>`);
  }
}
