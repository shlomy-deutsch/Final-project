import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import PostProductModel from 'src/app/models/post-product.model';
// import AgricultureIcon from '@mui/icons-material/Agriculture';
import {
  productUpdatedAction,
  setProducts,
  setTotal,
  totalUpdatedAction,
} from 'src/app/redux/redux.component';
import store from 'src/app/redux/store';
import ProductModel from '../../models/product.model';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css'],
})
export class CartTableComponent implements OnInit {
  public product = new PostProductModel();
  public total: number = 0;
  public products: PostProductModel[] = [];
  constructor(private http: HttpClient) {
    this.total = store.getState().productsState.total;
  }
  async ngOnInit() {
    try {
      this.total = store.getState().productsState.total;
      const cartid = store.getState().productsState.cart_ID;
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
    } catch (err) {
      console.log(err);
    }
  }

  public imageUrl = 'http://localhost:3000/api/products/images/';
  async delete(id: number) {
    const data = store.getState().productsState.cart_ID;

    try {
      await this.http
        .delete<ProductModel>(
          'http://localhost:3000/api/products/' + id + '/' + data + '/'
        )
        .toPromise();

      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }
  async deleteall() {
    const data = store.getState().productsState.cart_ID;

    try {
      await this.http
        .delete<ProductModel>(
          'http://localhost:3000/api/products/' + data + '/'
        )
        .toPromise();

      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }
  public async changecount(p: PostProductModel | any, e: any) {
    console.log(p.price);

    this.product.cart_ID = store.getState().productsState.cart_ID;
    this.product.product_ID = p.product_ID;
    const count = p.count;
    const newc = +e.target.value;
    this.product.count = newc;
    this.product.image = p.image;
    this.product.name = p.name;
    const price = p.total_Price / count;

    this.product.total_Price = newc * price;
    const newt = (newc - count) * price;

    store.dispatch(productUpdatedAction(this.product));
    store.dispatch(totalUpdatedAction(newt));
    try {
      const myFormData = PostProductModel.convertToFormData(this.product);
      await this.http
        .put<PostProductModel>(
          'http://localhost:3000/api/products/cart/',
          myFormData
        )
        .toPromise();
    } catch (err) {
      console.log(err);
    }
    this.ngOnInit();
  }
}
